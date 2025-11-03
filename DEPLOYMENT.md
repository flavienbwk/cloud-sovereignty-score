# Deployment Guide - GitHub Pages

This guide explains how to enable GitHub Pages for the Cloud Sovereignty Assessment web application.

## Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys the web application to GitHub Pages when you push to the `main` branch.

## Enable GitHub Pages

Follow these steps to enable GitHub Pages for your repository:

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/flavienbwk/cloud-sovereignty-score`
2. Click on **Settings** (in the top menu)
3. In the left sidebar, click on **Pages**
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
5. Save the settings

### Step 2: Trigger the Deployment

The deployment will happen automatically when you push to `main`. Since we just pushed, the workflow should already be running.

To check the deployment status:

1. Go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (usually takes 1-2 minutes)

### Step 3: Access Your Web Application

Once the deployment is complete, your web application will be available at:

**https://flavienbwk.github.io/cloud-sovereignty-score/**

## Manual Trigger

You can also manually trigger a deployment:

1. Go to the **Actions** tab
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the `main` branch
5. Click "Run workflow"

## Troubleshooting

### Pages Not Building

If GitHub Pages is not building:

1. Check that GitHub Pages is enabled in repository settings
2. Verify that the source is set to "GitHub Actions"
3. Check the Actions tab for any failed workflow runs

### 404 Error

If you get a 404 error:

1. Make sure the deployment workflow completed successfully
2. Wait a few minutes - GitHub Pages can take time to propagate
3. Check that the `.nojekyll` file exists in the root directory

### Workflow Fails

If the workflow fails:

1. Check the workflow logs in the Actions tab
2. Ensure you have the necessary permissions set in repository settings
3. The workflow needs `contents: read`, `pages: write`, and `id-token: write` permissions

## Custom Domain (Optional)

To use a custom domain:

1. Go to repository **Settings** > **Pages**
2. Under "Custom domain", enter your domain name
3. Add a `CNAME` file to the repository root with your domain
4. Configure DNS with your domain provider

## Local Testing

To test the web application locally before deploying:

```bash
# Start a simple HTTP server
python3 -m http.server 8080

# Or use Node.js
npx http-server -p 8080

# Then open http://localhost:8080 in your browser
```

## File Structure

The web application consists of:

- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `app.js` - Application logic and state management
- `questions.js` - Assessment questions data (converted from questions.yml)
- `.nojekyll` - Tells GitHub Pages not to use Jekyll processing
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow

## Updating the Application

To update the web application:

1. Make changes to the HTML, CSS, or JavaScript files
2. Test locally using a local server
3. Commit and push to the `main` branch
4. The deployment will happen automatically

```bash
git add .
git commit -m "Update web application"
git push origin main
```

## Monitoring

Monitor your deployments:

1. Check the **Actions** tab for deployment status
2. View deployment history in **Settings** > **Pages**
3. Monitor usage in **Insights** > **Traffic** (if enabled)
