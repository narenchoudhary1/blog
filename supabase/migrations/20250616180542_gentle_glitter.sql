/*
  # Seed sample data for blog

  1. Sample Data
    - Insert sample categories
    - Insert sample authors
    - Insert sample posts

  This is optional and can be used for testing purposes.
*/

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Technology', 'technology', 'Latest trends and insights in technology'),
  ('Business', 'business', 'Business news, strategies, and market insights'),
  ('Lifestyle', 'lifestyle', 'Health, wellness, and lifestyle content'),
  ('Health', 'health', 'Health and medical information')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample authors
INSERT INTO authors (name, email, bio) VALUES
  ('John Doe', 'john@trendpulsezone.com', 'Technology writer and industry analyst with 10+ years of experience'),
  ('Jane Smith', 'jane@trendpulsezone.com', 'Business strategist and entrepreneur focused on emerging markets'),
  ('Mike Johnson', 'mike@trendpulsezone.com', 'Health and wellness expert, certified nutritionist')
ON CONFLICT (email) DO NOTHING;

-- Insert sample posts (you can customize these)
INSERT INTO posts (
  title, 
  slug, 
  excerpt, 
  content, 
  featured_image,
  category_id, 
  author_id, 
  tags, 
  published, 
  meta_title, 
  meta_description,
  featured,
  view_count
) VALUES
  (
    'The Future of Artificial Intelligence in 2024',
    'future-of-ai-2024',
    'Exploring the latest developments in AI technology and what they mean for businesses and consumers.',
    '<p>Artificial Intelligence continues to evolve at an unprecedented pace. In this comprehensive analysis, we explore the key trends shaping AI in 2024.</p><h2>Key Developments</h2><p>From generative AI to autonomous systems, the landscape is rapidly changing...</p>',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
    (SELECT id FROM categories WHERE slug = 'technology' LIMIT 1),
    (SELECT id FROM authors WHERE email = 'john@trendpulsezone.com' LIMIT 1),
    ARRAY['AI', 'Technology', 'Future', 'Innovation'],
    true,
    'The Future of AI in 2024 - Latest Trends and Insights',
    'Discover the latest AI trends and developments shaping 2024. Expert analysis on artificial intelligence innovations.',
    true,
    1250
  ),
  (
    'Building Sustainable Business Models',
    'sustainable-business-models',
    'How modern companies are integrating sustainability into their core business strategies.',
    '<p>Sustainability is no longer just a buzzword—it''s a business imperative. Companies worldwide are reimagining their operations...</p><h2>The Business Case for Sustainability</h2><p>Research shows that sustainable practices drive long-term profitability...</p>',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=630&fit=crop',
    (SELECT id FROM categories WHERE slug = 'business' LIMIT 1),
    (SELECT id FROM authors WHERE email = 'jane@trendpulsezone.com' LIMIT 1),
    ARRAY['Business', 'Sustainability', 'Strategy', 'Environment'],
    true,
    'Sustainable Business Models - Building for the Future',
    'Learn how companies are building sustainable business models that drive profitability and environmental responsibility.',
    false,
    890
  )
ON CONFLICT (slug) DO NOTHING;