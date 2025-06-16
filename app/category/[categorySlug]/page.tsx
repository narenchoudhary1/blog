import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import PostCard from '@/components/PostCard'

interface CategoryPageProps {
  params: {
    categorySlug: string
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  
  return categories.map((category) => ({
    categorySlug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const posts = await getPostsByCategory(params.categorySlug, 1)
  
  if (posts.length === 0) {
    return {
      title: 'Category Not Found',
    }
  }

  const categoryName = posts[0].categories?.name || params.categorySlug
  const title = `${categoryName} Articles`
  const description = `Explore the latest ${categoryName.toLowerCase()} articles and insights on TrendPulseZone.`

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${params.categorySlug}`,
    },
    openGraph: {
      title,
      description,
      url: `/category/${params.categorySlug}`,
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await getPostsByCategory(params.categorySlug)
  
  if (posts.length === 0) {
    notFound()
  }

  const categoryName = posts[0].categories?.name || params.categorySlug

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-blue-100">
              Explore the latest {categoryName.toLowerCase()} articles and insights
            </p>
            <div className="mt-6 text-blue-200">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'}
            </div>
          </div>
        </div>
      </header>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}