# Human in the loop controls — Assessment

A 30-question assessment on human-in-the-loop controls for AI agents. React + Vite + Tailwind CSS, frontend only.

## Privacy

- No backend, database, accounts, analytics or third-party requests (fonts are bundled locally).
- Scoring runs entirely in the browser (`src/lib/scoring.js`).
- In-progress answers and the last result are kept only in the visitor's own `localStorage`, so a refresh doesn't lose progress. Nothing is ever transmitted.

## Develop

```bash
npm install
npm run dev      # local dev server
npm test         # data + scoring unit tests
npm run build    # static site in dist/
```

The build uses hash routing and a relative base, so `dist/` can be served from any static host (GitHub Pages, Netlify, S3, a sub-folder) with no rewrite rules.

## Structure

- `src/data/questions.js` — question text and options (exact wording, in order)
- `src/data/answerKey.js` — correct answers, kept separate from displayed text
- `src/lib/AssessmentContext.jsx` — assessment state and local persistence
- `src/components/` — reusable UI (header, options, progress, dialog, review, wave artwork)
- `src/pages/` — Home, About, Assessment, Results, Contact
- `src/config/site.js` — contact email used by the Contact page
