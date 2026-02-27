# Just-In Joy Coffee Co. - Dynamic API-Based Site

## Vercel Deployment for API-Driven Static Site ✅

Your site is configured to dynamically load content from your admin panel APIs. Here's the complete deployment guide and recommendations:

### Current Architecture:

- **Frontend**: Static HTML/CSS/JS hosted on Vercel
- **Backend**: API endpoints for dynamic content management
- **Admin Panel**: Content management system for real-time updates

### API Endpoints Used:

Made with ❤️ by [Lloyd Boone](https://twitter.com/lloydboone)

```
Base URL: https://just-in-joy-coffee-co-vmckt7lji-lloyd-boones-projects.vercel.app

- /v1/home-swipers/get/active      # Homepage carousel
- /v1/featured-drinks/get/active   # Featured drinks section
- /v1/shout-outs/get/active        # Testimonials
- /v1/socials/get/active           # Instagram/social posts
- /v1/gallery/get/active           # Photo gallery
- /v1/events/upcoming              # Event popup data
```

## Deployment Steps:

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts for new project setup
```

### Option 2: GitHub Integration

1. Your code is already in GitHub: `lboone/just-in-joy-coffee-co-static-site`
2. Go to [vercel.com](https://vercel.com) → "New Project"
3. Import your GitHub repository
4. Deploy automatically

## ⚠️ Important Considerations & Recommendations:

### 1. CORS Configuration

**CRITICAL**: Ensure your API server allows requests from your Vercel domain:

```javascript
// In your API server
app.use(
  cors({
    origin: [
      "https://your-vercel-domain.vercel.app",
      "https://just-in-joy-coffee-co.com", // your custom domain
      "http://localhost:3000", // for local development
    ],
  }),
);
```

### 2. Environment Configuration

Create environment-specific API URLs:

```javascript
// Recommended improvement for main.min.js
const API_BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:your-api-port"
  : "https://just-in-joy-coffee-co-vmckt7lji-lloyd-boones-projects.vercel.app";
```

### 3. Loading States & Error Handling

Add better UX for API calls:

```javascript
// Show loading spinners
// Handle network errors gracefully
// Provide fallback content
```

### 4. Performance Optimizations

**A. Client-Side Caching**

```javascript
// Cache API responses for better performance
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
```

**B. Lazy Loading**

- Load non-critical sections (gallery, testimonials) after initial page load
- Use Intersection Observer for scroll-based loading

**C. CDN Optimization**
Your images should be served from a CDN for better performance.

### 5. Monitoring & Analytics

Add error tracking:

```javascript
// Track API failures
fetch(apiUrl).catch((error) => {
  console.error("API Error:", error);
  // Send to analytics/monitoring service
});
```

### 6. Fallback Strategy

Consider hybrid approach:

- Keep static JSON files as fallbacks
- Fall back to local data if API is unavailable
- Show "Content temporarily unavailable" messages

### 7. Security Headers

The `vercel.json` includes security headers, but also ensure:

- API endpoints validate requests
- Rate limiting on your API
- Input sanitization in admin panel

## Custom Domain Setup:

1. Deploy to Vercel first
2. Add custom domain in Vercel dashboard
3. Update DNS settings
4. Update CORS configuration with new domain

## Content Management Workflow:

1. **Admin edits content** → Updates API database
2. **Frontend fetches** → Gets latest content dynamically
3. **No redeployment needed** → Content updates instantly

## Local Development:

```bash
# Serve locally
npx serve .
# or
python3 -m http.server 8000

# Make sure your API server is running and CORS is configured for localhost
```

## Recommended Improvements:

### 1. Add Loading States

```javascript
// Show skeleton screens while loading
document.getElementById("loading-spinner").style.display = "block";
```

### 2. Environment Variables

Use Vercel environment variables for API URLs:

```bash
vercel env add API_BASE_URL
```

### 3. Error Recovery

```javascript
// Retry failed requests
// Show user-friendly error messages
// Graceful degradation
```

### 4. Performance Monitoring

- Add performance tracking
- Monitor API response times
- Track user interactions

This architecture gives you the best of both worlds: static site performance with dynamic content management! 🚀
