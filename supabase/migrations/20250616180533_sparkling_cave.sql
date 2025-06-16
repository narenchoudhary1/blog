/*
  # Create blog schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text, nullable)
      - `created_at` (timestamp)
    - `authors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `bio` (text, nullable)
      - `avatar_url` (text, nullable)
      - `created_at` (timestamp)
    - `posts` (already exists, but ensuring proper structure)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access

  3. Functions
    - Create function to increment view count
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Ensure posts table exists with proper structure
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  category_id uuid NOT NULL REFERENCES categories(id),
  author_id uuid NOT NULL REFERENCES authors(id),
  tags text[],
  published boolean NOT NULL DEFAULT false,
  post_status text DEFAULT 'published',
  meta_title text,
  meta_description text,
  scheduled_at timestamptz,
  view_count integer DEFAULT 0,
  featured boolean DEFAULT false,
  allow_comments boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories are editable by authenticated users"
  ON categories
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for authors
CREATE POLICY "Authors are viewable by everyone"
  ON authors
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors are editable by authenticated users"
  ON authors
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for posts
CREATE POLICY "Published posts are viewable by everyone"
  ON posts
  FOR SELECT
  TO public
  USING (published = true AND post_status = 'published');

CREATE POLICY "Posts are editable by authenticated users"
  ON posts
  FOR ALL
  TO authenticated
  USING (true);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE posts
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = post_id;
END;
$$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published, post_status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);