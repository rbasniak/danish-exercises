# 🇩🇰 Danish Practice

A mobile-first web app for practising Danish vocabulary, hosted on GitHub Pages.

**Live app → [rbasniak.github.io/danish-exercises](https://rbasniak.github.io/danish-exercises)**

---

## Features

### Subjects
| Subject | Status |
|---------|--------|
| 📝 Verbs | ✅ Available |
| 🔠 Nouns | 🔜 Coming soon |
| 💬 Phrases | 🔜 Coming soon |

### Verb exercises

Three exercise modes using the **top 100 most common Danish verbs**:

| Mode | Description |
|------|-------------|
| 🇬🇧 → 🇩🇰 Translate to Danish | See the English meaning, pick the correct Danish infinitive |
| 🇩🇰 → 🇬🇧 Translate to English | See a Danish verb, pick its English meaning |
| 🗂 Conjugation Group | Classify the verb as **-ede**, **-te**, or **Irregular** |

### Smart distractors
- **EN→DA mode**: wrong answers are visually similar verbs (e.g. *at tale / at tage / at tro / at tænke*), so you really have to think
- **DA→EN mode**: wrong answers have similar meanings (e.g. *believe / think / mean / seem*)
- **Group mode**: questions are balanced ~⅓ from each conjugation class

### Other options
- **Question count**: 5 / 10 / 15 / 20
- **Time limit per question**: No limit / 30 s / 15 s
- **Audio**: auto-play Danish TTS pronunciation after each answer (uses the Web Speech API with `da-DK` locale); can be turned off for silent practice

### Feedback screen
After each answer a full-screen overlay shows ✓ or ✗, the correct answer, and (in group mode) the past-tense form as a reinforcement hint. A 🔊 button lets you replay the pronunciation; tapping anywhere else advances to the next question.

---

## Tech stack

Pure HTML / CSS / JavaScript — no build step, no framework, no dependencies except:
- [Twemoji](https://github.com/twitter/twemoji) — cross-platform emoji rendering (flags, icons)
- Web Speech API — Danish TTS (built into all modern browsers)

---

## Project structure

```
danish-exercises/
├── index.html           Home page (subject cards)
├── verbs-config.html    Exercise configuration
├── exercise.html        Exercise runner + summary screen
├── css/
│   └── style.css        All styles — dark theme, mobile-first
└── js/
    ├── verbs-data.js    100 verb entries + writing/meaning similarity clusters
    └── exercise.js      Exercise generation, timer, TTS, scoring logic
```

---

## Enabling GitHub Pages

1. Go to **Settings → Pages** in this repository
2. Set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`
3. Save — the app will be live at `https://rbasniak.github.io/danish-exercises`
