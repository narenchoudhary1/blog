import { supabaseAdmin } from './supabase'
import type { Post } from './supabase'

export async function getAllPosts(limit?: number): Promise<Post[]> {
  let query = supabaseAdmin
    .from('posts')
    .select(`
      *,
      categories:category_id (
        id,
        name,
        slug
      ),
      authors:author_id (
        id,
        name,
        email
      )
    `)
    .eq('published', true)
    .eq('post_status', 'published')
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select(`
      *,
      categories:category_id (
        id,
        name,
        slug
      ),
      authors:author_id (
        id,
        name,
        email
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .eq('post_status', 'published')
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data
}

export async function getPostsByCategory(categorySlug: string, limit?: number): Promise<Post[]> {
  let query = supabaseAdmin
    .from('posts')
    .select(`
      *,
      categories:category_id!inner (
        id,
        name,
        slug
      ),
      authors:author_id (
        id,
        name,
        email
      )
    `)
    .eq('published', true)
    .eq('post_status', 'published')
    .eq('categories.slug', categorySlug)
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }

  return data || []
}

export async function getFeaturedPosts(limit: number = 5): Promise<Post[]> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select(`
      *,
      categories:category_id (
        id,
        name,
        slug
      ),
      authors:author_id (
        id,
        name,
        email
      )
    `)
    .eq('published', true)
    .eq('post_status', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }

  return data || []
}

export async function incrementViewCount(postId: string): Promise<void> {
  const { error } = await supabaseAdmin.rpc('increment_view_count', {
    post_id: postId
  })

  if (error) {
    console.error('Error incrementing view count:', error)
  }
}

export async function getAllCategories() {
  const { data, error } = await supabaseAdmin
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}