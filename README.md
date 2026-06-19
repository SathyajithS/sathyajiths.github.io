# Sathyajith S — Cinema Portfolio

Full-screen video-hero portfolio site for **Sathyajith S**, QA/Test Engineer.
Next.js (App Router) + GSAP. Static-exported, GitHub Pages ready.

Built from your resume — About, Skills, Experience (Webeaz Technologies +
Luminar Technolab), Projects (Croma.com automation + BS Sports manual
testing), Education, and Contact are all already filled in with your real
data.

## ⚠️ Before you do anything: replace the hero video

This repo ships with a **placeholder** `public/video/hero.mp4` (a plain dark
screen with your name and a quiet test tone) so the project runs immediately.
**Swap it for a real video** before deploying:

1. Drop your own clip in as `public/video/hero.mp4` (**same filename**), or
2. Keep your own filename and update the `src` in `components/VideoIntro.js`
   (search for `src="video/hero.mp4"`).

Recommended: MP4 (H.264 + AAC audio), 1920×1080, under ~15MB so it loads
fast. Landscape video that's interesting in its first 2 seconds works best
since that's what's visible before any text animates in.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

### About video + audio autoplay

The hero video tries to autoplay **with sound** the instant the page loads.
Browsers (Chrome, Safari, etc.) block unmuted autoplay unless the user has
already interacted with your site — this is a universal browser policy, not
a bug. When that happens:

- The video still plays automatically, just muted.
- A small "Click to enable audio" pill appears at the top — one click and
  sound kicks in.
- Manual play/pause and mute/unmute buttons sit bottom-right at all times.

This is the most reliable pattern that works in production; there's no way
to force unmuted autoplay everywhere — every major browser blocks it by
design.

## Edit content

**Name / tagline / role** — `app/page.js`:

```js
<VideoIntro
  firstName="Sathyajith"
  lastName="S"
  tagline="Breaking software before users do."
  role="QA Engineer"
/>
```

**About text + stats** — `components/AboutSection.js`

**Skills** — `components/SkillsSection.js` (`skillGroups` array)

**Experience** — `components/ExperienceSection.js` (`experience` array)

**Projects** — `components/WorkSection.js` (`projects` array)

**Contact / education / footer** — `components/ContactSection.js`

**Colors / fonts** — CSS variables at top of `app/globals.css`:

```css
--gold: #c9a84c;
--white: #f5f0e8;
--black: #0a0a0a;
```

## Deploy to GitHub Pages (recommended — free, automatic)

1. Create a new repo on GitHub and push this folder to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit — cinema portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. On GitHub: go to your repo → **Settings → Pages** → under **Build and
   deployment**, set **Source** to **GitHub Actions**.
3. That's it. The included workflow (`.github/workflows/deploy.yml`) builds
   and deploys automatically on every push to `main`.
4. Your site appears at:
   `https://<your-username>.github.io/<repo-name>/`
   (or `https://<your-username>.github.io/` if you name the repo
   `<your-username>.github.io`).

No manual `basePath` configuration needed — `next.config.js` detects the
repo name from the GitHub Actions environment automatically and rewrites all
asset paths to match.

> **Large video files:** GitHub has a 100MB per-file hard limit and warns
> above 50MB. If your hero video is large, either compress it (see below)
> or use [Git LFS](https://git-lfs.github.com/).

### Compress a large video (optional, needs ffmpeg)

```bash
ffmpeg -i your-video.mp4 -vcodec libx264 -crf 28 -preset slow \
  -acodec aac -b:a 128k -movflags +faststart public/video/hero.mp4
```

## Manual static build (any static host: Netlify, Vercel, S3, Cloudflare Pages)

```bash
npm run build
```

Output goes to `out/` — upload that folder anywhere that serves static
files.

## Stack

- **Next.js 14** (App Router, static export — no server features: no API
  routes, no Image optimization component, no server actions)
- **React 18**
- **GSAP** (+ ScrollTrigger) for letterbox reveal, letter-cascade name
  animation, and scroll-triggered section reveals
- Plain CSS Modules — no Tailwind, no UI framework, fully hand-styled

## Project structure

```
app/
  layout.js          → root layout + metadata
  page.js             → assembles all sections
  globals.css         → CSS variables, resets
components/
  NavBar.js            → fixed nav, scroll-aware, mobile menu
  VideoIntro.js         → full-screen video hero, autoplay+audio, GSAP intro
  AboutSection.js       → bio + stats
  SkillsSection.js      → skill category cards
  ExperienceSection.js  → timeline (Webeaz, Luminar)
  WorkSection.js         → project cards (Croma.com, BS Sports)
  ContactSection.js      → contact links + education + footer
  *.module.css           → scoped styles per component
public/
  video/hero.mp4         → ⚠️ placeholder — replace this
.github/workflows/
  deploy.yml              → GitHub Pages auto-deploy
```

## Troubleshooting

**Video doesn't show on GitHub Pages but works locally** — almost always a
path/case-sensitivity issue. GitHub Pages is case-sensitive; double-check
`public/video/hero.mp4` matches the `src` in `VideoIntro.js` exactly.

**No sound at all, even after clicking the prompt** — check the video file
itself actually has an audio track:
`ffprobe public/video/hero.mp4` should list an `Audio:` stream.

**Build fails in GitHub Actions** — check the Actions tab on your repo for
the exact error; almost always a missing dependency (re-run
`npm install` locally and commit the updated `package-lock.json`) or a typo
in edited content.
