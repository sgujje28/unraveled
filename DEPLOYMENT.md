# GitHub Pages Deployment

This project automatically deploys to GitHub Pages when you push to the `main` branch.

## Setup Instructions

1. **Enable GitHub Pages** in your repository:

   - Go to: Settings → Pages
   - Source: Select "GitHub Actions"
   - Click Save

2. **Push your code**:

   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Wait for deployment**:
   - Go to Actions tab in your GitHub repository
   - Watch the "Deploy to GitHub Pages" workflow run
   - Once complete, your site will be live at:
     `https://sgujje28.github.io/unraveled/`

## Manual Deployment

To build and preview locally:

```bash
npm run web:export
# Output will be in the dist/ folder
```

## How It Works

- The workflow runs on every push to `main`
- It exports your Expo app as a static website
- The `dist/` folder is deployed to GitHub Pages
- Your app will be accessible via the GitHub Pages URL
