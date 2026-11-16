# Sourav Das — Sheru Vai Personal Website

A responsive, dark-premium personal brand website built with React, Vite and Tailwind CSS v4.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Before publishing — important replacements

Search the project for `YOUR-DOMAIN.example` and replace it with your real HTTPS domain in:

- `index.html` (canonical URL, Open Graph URL and image)
- `src/App.jsx` (Person structured data URL)
- `public/robots.txt`
- `public/sitemap.xml`

Also replace `YOUR-EMAIL@example.com` in `src/App.jsx` with an email address you want visitors to use.

Create an `og-image.jpg` (recommended 1200 × 630 px) and place it in `public/`. Use a real photo or original brand artwork that you have permission to publish.

## Deploy to Vercel

1. Create a GitHub repository and push this project.
2. Sign in at https://vercel.com/ and import the repository.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.
7. In Vercel project settings, add your custom domain and follow the DNS instructions.
8. Once DNS and HTTPS are active, replace the example domain throughout the project and redeploy.

You can also deploy the `dist/` folder to Netlify. Set build command to `npm run build` and publish directory to `dist`.

## Google Search setup

1. Verify your domain in Google Search Console.
2. Submit `https://YOUR-REAL-DOMAIN/sitemap.xml`.
3. Inspect the homepage URL and request indexing.
4. Test the Person structured data with Google's Rich Results Test and Schema.org Validator.
5. Keep the site accurate and publish genuinely useful, original updates.

Indexing and ranking are controlled by Google. Structured data and sitemap submission do not guarantee rankings or a special search result.

## Content and claims

This website describes Sourav Das as a creator and community builder documenting a personal Sheru Vai journey. It intentionally does not claim that Sourav originated, owns or founded the wider trend. Only add factual milestones, dates, social links, photos and claims that can be verified.

## Customization

- Main page content and navigation: `src/App.jsx`
- Design system and responsive styling: `src/styles.css`
- SEO metadata: `index.html`
- Sitemap and crawler rules: `public/sitemap.xml`, `public/robots.txt`
