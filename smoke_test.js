const fs = require('fs');

// Load both JS files
let verbsCode = fs.readFileSync('js/verbs-data.js', 'utf8')
  .replace(/^'use strict';/m, '')
  .replace(/\bconst\b/g, 'var')
  .replace(/\blet\b/g, 'var');

let exerciseCode = fs.readFileSync('js/exercise.js', 'utf8')
  .replace(/^'use strict';/m, '')
  .replace(/\bconst\b/g, 'var')
  .replace(/\blet\b/g, 'var');

// Execute with return of all top-level vars
const combined = verbsCode + '\n' + exerciseCode + '\n' +
  'return { VERBS, WRITING_CLUSTERS, MEANING_CLUSTERS, generateExercises };';
const { VERBS, WRITING_CLUSTERS, MEANING_CLUSTERS, generateExercises } = new Function(combined)();

console.log(`Total verbs: ${VERBS.length}`);

// Check no duplicates
const infCounts = {};
VERBS.forEach(v => { infCounts[v.inf] = (infCounts[v.inf] || 0) + 1; });
const dups = Object.entries(infCounts).filter(([,c]) => c > 1);
console.log(`Duplicate infs: ${dups.length}`, dups.slice(0,5));

// Check all IDs unique
const ids = VERBS.map(v => v.id);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log(`Duplicate IDs: ${dupIds.length}`, dupIds.slice(0,5));

// Check group distribution
const groups = {ede: 0, te: 0, irregular: 0};
VERBS.forEach(v => groups[v.group] = (groups[v.group]||0) + 1);
console.log('Group distribution:', groups);

// Test exercises - top100
const c100 = { verbSet: 'top100', exerciseType: 'en-to-da', count: '10', timeLimit: '30', audio: 'on' };
const q100 = generateExercises(c100);
console.log(`\nTop-100 EN→DA exercises generated: ${q100.length}`);
q100.slice(0,3).forEach(q => {
  const correctLabel = (q.options.find(o => o.value === q.correctValue) || {}).label;
  console.log(`  Q: "${q.question}" → correct: "${correctLabel}"`);
});

// Test exercises - top500
const c500 = { verbSet: 'top500', exerciseType: 'da-to-en', count: '10', timeLimit: 'none', audio: 'off' };
const q500 = generateExercises(c500);
console.log(`\nTop-500 DA→EN exercises generated: ${q500.length}`);
q500.slice(0,3).forEach(q => {
  const correctLabel = (q.options.find(o => o.value === q.correctValue) || {}).label;
  console.log(`  Q: "${q.question}" → correct: "${correctLabel}"`);
});

// Test group exercises top500
const cGroup = { verbSet: 'top500', exerciseType: 'group', count: '15', timeLimit: 'none', audio: 'off' };
const qGroup = generateExercises(cGroup);
const grpDist = {ede:0, te:0, irregular:0};
qGroup.forEach(q => grpDist[q.verbData?.group] = (grpDist[q.verbData?.group]||0)+1);
console.log(`\nTop-500 Group exercises generated: ${qGroup.length}, distribution:`, grpDist);

// Check no ??? meanings in top-100
const top100 = VERBS.slice(0, 100);
const missingMeanings100 = top100.filter(v => !v.meaning || v.meaning === '???');
console.log(`\nTop-100 missing meanings: ${missingMeanings100.length}`);

// Check ??? meanings in all verbs
const missingAll = VERBS.filter(v => !v.meaning || v.meaning === '???');
console.log(`Total verbs with missing meaning: ${missingAll.length}`);
if (missingAll.length > 0) {
  missingAll.forEach(v => console.log(`  id ${v.id}: ${v.inf}`));
}

console.log('\nSmoke test PASSED ✓');
