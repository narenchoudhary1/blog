import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Types
export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  category_id: string
  author_id: string
  tags: string[] | null
  published: boolean
  post_status: string | null
  meta_title: string | null
  meta_description: string | null
  scheduled_at: string | null
  view_count: number | null
  featured: boolean | null
  allow_comments: boolean | null
  created_at: string | null
  updated_at: string | null
  categories?: {
    id: string
    name: string
    slug: string
  }
  authors?: {
    id: string
    name: string
    email: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string | null
}

export interface Author {
  id: string
  name: string
  email: string
  bio: string | null
  avatar_url: string | null
  created_at: string | null
}