# Thonduru Premsai — Portfolio (Vite Project)

A personal portfolio site built with plain HTML/CSS/JS, wired up as a [Vite](https://vitejs.dev/) project for a modern dev workflow (fast dev server, hot reload, optimized production build).

## Project Structure

```
premsai-portfolio/
├── index.html            Vite entry point — all page markup (hero, about, skills,
│                          projects, experience, contact sections)
├── src/
│   ├── style.css          All styling: theme variables, layout, animations, responsive rules
│   └── main.js             All interactivity: theme toggle, scrollspy, typed text,
│                            particle canvas, reveal animations, skill bars, stat counters,
│                            testimonial carousel, contact form (loaded as an ES module)
├── public/
│   └── images/             Static assets copied as-is to the build output (favicon,
│                            resume.pdf, project screenshots, etc.) — reachable at the site root
├── vite.config.js          Vite configuration (dev server port, build output dir)
├── package.json            Scripts and dependencies
├── .vscode/                Editor settings + recommended extensions
└── README.md
```

## How to Run

1. Open this folder in VS Code (`File → Open Folder…`).
2. Open a terminal in VS Code (`` Ctrl+` `` / `` Cmd+` ``) and install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Vite will print a local URL (typically `http://localhost:5173`) and open it in your browser automatically. Edits to `index.html`, `src/style.css`, or `src/main.js` hot-reload instantly.

### Other scripts

- `npm run build` — produces an optimized production build in `dist/`.
- `npm run preview` — serves the `dist/` build locally to sanity-check it before deploying.

## Requirements

- [Node.js](https://nodejs.org/) 18+ and npm (Vite 5 requires Node 18 or newer). If `npm install` fails with an engine error, update Node.js first.

## Notes / Things You May Want to Personalize

- **Resume button**: The "Download CV" buttons currently show an alert reminding you to add a real file. To enable them, drop your resume at `public/resume.pdf` and update the two buttons in `index.html`:
  ```html
  <a href="/resume.pdf" download class="btn btn-primary btn-sm"><i class="fa-solid fa-download"></i> Download CV</a>
  ```
  (do the same for `#download-cv-2`), then remove the placeholder click handler near the bottom of `src/main.js` if you like.
- **Contact form**: The form currently simulates sending (shows a success message after ~1 second) but doesn't actually send email anywhere. To make it functional, wire it up to a service like Formspree, EmailJS, or your own backend endpoint.
- **External resources**: Google Fonts and Font Awesome icons load from their CDNs via `<link>` tags in `index.html`, so an internet connection is needed the first time the page loads (the browser caches them after that).
- **Images**: The hero/about sections currently use CSS-drawn graphics — no photos are required to run the site. Add your own images to `public/images/` and reference them from `index.html` (e.g. `/images/photo.jpg`) if you'd like to swap in real photos.

## Tech Used

- [Vite](https://vitejs.dev/) — dev server & build tool
- HTML5, CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES module, no frameworks)
- Font Awesome 6 (icons, via CDN)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono (via CDN)
