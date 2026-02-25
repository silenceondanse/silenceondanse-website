# 🎧 SOND — Website Rebuild — Main Task

> **Silence. On danse !** — Complete website rebuild  
> Last updated: 2026-02-25  
> Original site: [silenceondanse.ca](https://www.silenceondanse.ca/)

---

## Project Status Overview

| Page | Built | SEO Meta | Responsive | Content Match | Polish |
|------|:-----:|:--------:|:----------:|:-------------:|:------:|
| `index.html` | ✅ | ✅ | ✅ | ⚠️ | ⚠️ |
| `services.html` | ✅ | ✅ | ✅ | ⚠️ | ⚠️ |
| `notrehistoire.html` | ✅ | ✅ | ✅ | ⚠️ | ⚠️ |
| `fiche-technique.html` | ✅ | ✅ | ✅ | ⚠️ | ⚠️ |
| `photos.html` | ✅ | ✅ | ✅ | ⚠️ | ⚠️ |
| `contact.html` | ✅ | ✅ | ✅ | ⚠️ | ⚠️ |

**Legend:** ✅ Done | ⚠️ Needs Review / Refinement | ❌ Not Started

---

## ✅ What Is Done

### Structure & Foundation
- [x] All 6 HTML pages created and linked together
- [x] Consistent header/navigation across all pages
- [x] Consistent footer with social links and copyright
- [x] CSS design system (`variables.css` + `style.css` — 1332 lines)
- [x] `main.js` — sticky header, scroll reveal, testimonial slider, parallax, floating cards, smooth scroll, mobile menu, gallery animations
- [x] Google Fonts (Chivo) loaded across all pages

### SEO & Meta
- [x] `<title>` tags on every page
- [x] `<meta description>` on every page
- [x] Open Graph tags on every page
- [x] Semantic HTML structure
- [x] Unique IDs on all major sections

### Assets
- [x] 37 images collected from original site
- [x] 2 videos: `hero_main.mp4`, `phototheque.mp4`
- [x] Original site HTML saved as `assets/index.html_live`

---

## ⚠️ Remaining Tasks

### 🔴 Priority 1 — Content & Core Features

- [ ] **All pages — Navigation redesign**: Redo header/nav closer to original. All titles on one line, tight height, clean layout.
- [ ] **index.html — Floating cards animation**: Keep current design, but the **question card must arrive before the answer card** (fix animation sequencing)
- [ ] **notrehistoire.html — Designer layout overhaul**: Apply full designer-level rework — typography, layout, visual hierarchy, spacing
- [ ] **fiche-technique.html — Readability**: Significantly improve legibility and reading experience
- [ ] **contact.html — Form with email**: Compress form + fix photo. Implement form to **send email to infosilenceondanse@gmail.com** with full form content. Use Netlify Forms for production.
  - *Note for user: After deploying to Netlify, we will test the form and email automation together*
- [ ] **All pages — Text content verification**: Cross-reference all copy against original site

### 🟡 Priority 2 — Visual Polish & Mobile

- [ ] **Mobile responsiveness — thorough review**: Full audit of menu and every page on mobile (especially the nav)
- [ ] **Hover effects & micro-animations**: Enhance for premium feel
- [ ] **Testimonials**: Verify quotes match original; potentially add more
- [ ] **Color consistency**: Replace inline styles with CSS variables across all pages

### 🟢 Priority 3 — Deployment

- [ ] **GitHub & Netlify setup**: Prepare everything for one-click deployment
  - Optimize image/video file sizes
  - Create proper `.gitignore`
  - Initialize git repo
  - Create `netlify.toml` config
  - Document **first-time deploy** steps
  - Document **future update** workflow (one-click push → auto publish)
- [ ] **Favicon**: Add a branded favicon
- [ ] **Accessibility**: Alt text review, keyboard navigation, contrast
- [ ] **Custom 404 page**: Branded error page

### ⬜ Priority 4 — Future (Not Now)
- [ ] **Sitemap.xml** and **robots.txt** for SEO

---

> **Note:** Analytics, cookie consent banner removed from scope per user preference.

---

## 🗑️ Files to Archive (Not Delete)

| File | Action |
|------|--------|
| `assets/scraper.py` | Archive — no longer needed actively |
| `assets/index.html_live` | **Keep** — reference for content verification |

---

## 📁 Project Structure

```
SOND - Website Rebuild/
├── index.html
├── services.html
├── notrehistoire.html
├── fiche-technique.html
├── photos.html
├── contact.html
├── css/
│   ├── variables.css
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── images/   (37 images)
    ├── video/    (hero_main.mp4, phototheque.mp4)
    ├── scraper.py
    └── index.html_live
```
