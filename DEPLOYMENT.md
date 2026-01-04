# Deployment Guide - AlumBridge

## Prerequisites
- Supabase account with configured database
- Vercel account (free tier works)
- GitHub repository

## Quick Deploy to Vercel

### 1. Prepare Your Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
6. Click "Deploy"

### 3. Environment Variables Setup

Update your code to use environment variables:

**Create `.env` file:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Update `passkey.js`:**
```javascript
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://wyazjkqewmoikkcwpolz.supabase.co";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_SFZkaBy3jCEV2tJBsSU8Ow_SzNbQz-p";
```

### 4. Supabase Configuration

In your Supabase dashboard:

1. **Authentication Settings**
   - Go to Authentication → URL Configuration
   - Add your Vercel domain to "Site URL"
   - Add `https://your-app.vercel.app/**` to "Redirect URLs"

2. **Database Setup**
   - Run all SQL scripts in order:
     1. `database-schema.sql`
     2. `create-matches-table.sql`
     3. `insert-dummy-data.sql`
     4. `create-student-profile.sql`

3. **Enable Email Auth**
   - Go to Authentication → Providers
   - Enable Email provider
   - Configure email templates (optional)

### 5. Post-Deployment

1. **Test Authentication**
   - Sign up with a test account
   - Verify email confirmation works
   - Test login/logout

2. **Test Features**
   - Create student/alumni profiles
   - Book mentorship sessions
   - Post opportunities
   - Send messages

3. **Monitor**
   - Check Vercel deployment logs
   - Monitor Supabase usage
   - Set up error tracking (optional: Sentry)

## Alternative Deployment Options

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### GitHub Pages (Static Only)
```bash
npm run build
# Push dist folder to gh-pages branch
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Supabase database schema deployed
- [ ] Dummy data inserted (optional)
- [ ] Authentication URLs configured
- [ ] Email provider enabled
- [ ] RLS policies enabled
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Error tracking setup (optional)
- [ ] Analytics setup (optional)

## Troubleshooting

**Build Fails:**
- Check Node.js version (use v18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

**Authentication Issues:**
- Verify Supabase URL in environment variables
- Check redirect URLs in Supabase dashboard
- Ensure email provider is enabled

**Database Errors:**
- Verify all SQL scripts ran successfully
- Check RLS policies are enabled
- Ensure foreign key constraints are correct

## Performance Optimization

1. **Enable Caching**
   - Add cache headers in `vercel.json`
   - Use CDN for static assets

2. **Optimize Images**
   - Use WebP format
   - Implement lazy loading
   - Use Unsplash CDN

3. **Code Splitting**
   - Already configured with Vite
   - Lazy load routes if needed

## Security Best Practices

- Never commit `.env` file
- Use environment variables for secrets
- Enable RLS on all tables
- Validate user input
- Implement rate limiting (Supabase Edge Functions)
- Regular security audits

## Monitoring & Analytics

**Recommended Tools:**
- Vercel Analytics (built-in)
- Sentry for error tracking
- Google Analytics for user tracking
- Supabase Dashboard for database monitoring

## Support

For issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Review browser console errors
4. Check network tab for API errors

## Cost Estimation

**Free Tier:**
- Vercel: Free for personal projects
- Supabase: 500MB database, 2GB bandwidth
- Total: $0/month

**Paid Tier (if needed):**
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Total: $45/month
