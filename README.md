# Learn with Chahat

Static portfolio site for Spanish and English language coaching.

Live site (after deploy): `https://<your-github-username>.github.io/learn-with-chahat/`

## Publish to GitHub Pages

### 1. Create a GitHub repository

Create a new repo named **`learn-with-chahat`** on GitHub (empty, no README).

### 2. Push this folder

From this directory:

```bash
git init
git add .
git commit -m "Initial commit: Learn with Chahat site"
git branch -M main
git remote add origin https://github.com/<your-github-username>/learn-with-chahat.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. The workflow in `.github/workflows/pages.yml` deploys automatically on every push to `main`

After the first workflow run finishes, the site is live at:

`https://<your-github-username>.github.io/learn-with-chahat/`

### 4. Update config (optional)

In `config.js`:

- Replace `YOUR_USERNAME` in the canonical URL inside `index.html` (or let the script update it after deploy)
- Set `basePath: '/learn-with-chahat'` if auto-detection ever fails

## Custom domain (optional)

1. Add a `CNAME` file to this folder with your domain (e.g. `learnwithchahat.com`)
2. Configure DNS at your domain provider (GitHub Docs → “Managing a custom domain”)

## Local preview

```bash
python3 -m http.server 8765
```

Open `http://localhost:8765`

## Project structure

```
index.html      Main page
styles.css      Styles
script.js       Navigation, form embed, GitHub Pages helpers
config.js       Google Form URL and site settings
assets/         Images
404.html        GitHub Pages fallback redirect
.nojekyll       Disables Jekyll processing on GitHub Pages
```
