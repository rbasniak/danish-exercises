'use strict';

/* ── Danish Number Conversion ────────────────────────────────── */

const _ONES = [
  '', 'en', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni',
  'ti', 'elleve', 'tolv', 'tretten', 'fjorten', 'femten',
  'seksten', 'sytten', 'atten', 'nitten'
];
const _TENS = [
  '', '', 'tyve', 'tredive', 'fyrre',
  'halvtreds', 'tres', 'halvfjerds', 'firs', 'halvfems'
];

function danishNumber(n) {
  if (n === 0) return 'nul';
  if (n < 20) return _ONES[n];
  if (n < 100) {
    const u = n % 10;
    const t = Math.floor(n / 10);
    return u === 0 ? _TENS[t] : _ONES[u] + 'og' + _TENS[t];
  }
  if (n < 1000) {
    const h    = Math.floor(n / 100);
    const rest = n % 100;
    const hStr = h === 1 ? 'hundrede' : _ONES[h] + ' hundrede';
    return rest === 0 ? hStr : hStr + ' og ' + danishNumber(rest);
  }
  if (n < 10000) {
    const th   = Math.floor(n / 1000);
    const rest = n % 1000;
    const tStr = th === 1 ? 'et tusind' : danishNumber(th) + ' tusind';
    if (rest === 0) return tStr;
    if (rest < 100) return tStr + ' og ' + danishNumber(rest);
    return tStr + ' ' + danishNumber(rest);
  }
  return String(n);
}

// For TTS: split compound "enogtyve" → "en og tyve" so speech sounds natural
function danishNumberTTS(n) {
  return danishNumber(n).replace(/([a-zæøå])(og)([a-zæøå])/gi, '$1 og $3');
}

/* ── Utilities ───────────────────────────────────────────────── */

function _numShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function _randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ── Distractor Generation ───────────────────────────────────── */

// For 50-99: same units digit across all five 50-99 decades makes
// halvtreds / halvfjerds / halvfems (and nearby firs / tres) confusable.
function _halvCandidates(n) {
  if (n < 50 || n > 99) return [];
  const units  = n % 10;
  const myTens = Math.floor(n / 10);
  const out = [];
  for (let t = 5; t <= 9; t++) {
    if (t === myTens) continue;
    out.push(t * 10 + units);
  }
  return out; // exactly 4 candidates
}

// Returns exactly 3 distractor numbers for n
function getNumberDistractors(n) {
  const used   = new Set([n]);
  const result = [];

  // Special rule for 50-99: use same units across all decades 50-90
  if (n >= 50 && n <= 99) {
    const halvC = _numShuffle(_halvCandidates(n));
    for (const c of halvC) {
      if (result.length === 3) break;
      if (!used.has(c)) { used.add(c); result.push(c); }
    }
  }

  // Fill remaining with proximity-based candidates
  if (result.length < 3) {
    const fill = [];

    if (n >= 1 && n <= 99) {
      for (let d = 1; d <= 20; d++) {
        if (n + d <= 99) fill.push(n + d);
        if (n - d >= 1)  fill.push(n - d);
      }
      // Same units, different tens
      for (let t = 0; t <= 9; t++) {
        const c = t * 10 + (n % 10);
        if (c >= 1 && c <= 99) fill.push(c);
      }
    } else if (n >= 100 && n <= 999) {
      for (const d of [10, 20, 50, 100, 200]) {
        if (n + d <= 999) fill.push(n + d);
        if (n - d >= 100) fill.push(n - d);
      }
      // Same remainder, different hundreds
      for (let h = 1; h <= 9; h++) fill.push(h * 100 + (n % 100));
    } else if (n >= 1000 && n <= 9999) {
      for (const d of [100, 250, 500, 1000]) {
        if (n + d <= 9999) fill.push(n + d);
        if (n - d >= 1000) fill.push(n - d);
      }
      for (let th = 1; th <= 9; th++) fill.push(th * 1000 + (n % 1000));
    }

    _numShuffle(fill);
    for (const c of fill) {
      if (result.length === 3) break;
      if (!used.has(c) && Number.isInteger(c) && c >= 1 && c <= 9999) {
        used.add(c);
        result.push(c);
      }
    }
  }

  // Last resort: random in same range
  while (result.length < 3) {
    let c;
    if (n < 100)       c = _randInt(1, 99);
    else if (n < 1000) c = _randInt(100, 999);
    else               c = _randInt(1000, 9999);
    if (!used.has(c)) { used.add(c); result.push(c); }
  }

  return result;
}

/* ── Number Pool Generation ──────────────────────────────────── */
// ~75% from 1-99, ~20% from 100-999, ~5% from 1000-9999
// 1000-9999 only when count >= 10 (min 1)
function generateNumberPool(count) {
  let n3, n2, n1;
  if (count < 10) {
    n3 = 0;
    n2 = Math.max(1, Math.round(count * 0.20));
    n1 = count - n2;
  } else {
    n3 = Math.max(1, Math.round(count * 0.05));
    n2 = Math.max(1, Math.round(count * 0.20));
    n1 = count - n2 - n3;
  }

  const pool = [];
  const used = new Set();

  function pickUnique(min, max) {
    let v, tries = 0;
    do { v = _randInt(min, max); tries++; } while (used.has(v) && tries < 300);
    used.add(v);
    pool.push(v);
  }

  for (let i = 0; i < n1; i++) pickUnique(1, 99);
  for (let i = 0; i < n2; i++) pickUnique(100, 999);
  for (let i = 0; i < n3; i++) pickUnique(1000, 9999);

  return _numShuffle(pool);
}
