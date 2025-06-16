# TrendPulseZone - Next.js Blog

A modern, SEO-optimized blog built with Next.js 14+ and Supabase.

## Features

- ✅ **Next.js 14+ with App Router** - Latest Next.js features
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, JSON-LD
- ✅ **Supabase Integration** - PostgreSQL database with real-time capabilities
- ✅ **Dynamic Routing** - Posts and categories with clean URLs
- ✅ **Image Optimization** - Next.js Image component with lazy loading
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **TypeScript** - Full type safety
- ✅ **Sitemap & Robots.txt** - Auto-generated for better SEO
- ✅ **View Counter** - Track post views
- ✅ **Social Sharing** - Built-in social media sharing
- ✅ **Performance Optimized** - Fast loading and Core Web Vitals optimized

## Tech Stack

- **Framework**: Next.js 14+
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd trendpulsezone-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local` and fill in your Supabase credentials:
   ```bash
   cp .env.local .env.local
   ```
   
   Update the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   NEXT_PUBLIC_SITE_URL=https://trendpulsezone.com
   ```

4. **Set up the database**
   
   Run the migration files in your Supabase SQL editor:
   - `supabase/migrations/create_blog_schema.sql`
   - `supabase/migrations/seed_sample_data.sql` (optional, for sample data)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The blog uses three main tables:

- **posts** - Blog posts with SEO metadata
- **categories** - Post categories
- **authors** - Post authors

See `supabase/migrations/create_blog_schema.sql` for the complete schema.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── category/          # Category pages
│   ├── posts/             # Post pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap
├── components/            # React components
├── lib/                   # Utility functions
│   ├── posts.ts          # Post-related functions
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # General utilities
└── supabase/
    └── migrations/        # Database migrations
```

## SEO Features

- **Dynamic Meta Tags** - Title, description, keywords per page
- **Open Graph** - Social media previews
- **Twitter Cards** - Twitter-specific meta tags
- **JSON-LD Structured Data** - Rich snippets for search engines
- **Canonical URLs** - Prevent duplicate content issues
- **Sitemap** - Auto-generated from database
- **Robots.txt** - Search engine crawling instructions

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Customization

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for Tailwind customization
- Edit component styles in individual component files

### Content
- Update site metadata in `app/layout.tsx`
- Modify the home page in `app/page.tsx`
- Customize components in the `components/` directory

### Database
- Add new migrations in `supabase/migrations/`
- Update types in `lib/supabase.ts`
- Modify queries in `lib/posts.ts`

## Performance

The blog is optimized for performance:
- **Static Generation** - Pages are pre-rendered at build time
- **Image Optimization** - Automatic image optimization with Next.js
- **Code Splitting** - Automatic code splitting for faster loading
- **Caching** - Aggressive caching strategies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.