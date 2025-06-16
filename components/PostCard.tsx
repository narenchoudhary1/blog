import Image from 'next/image'
import Link from 'next/link'
import { formatDate, truncateText } from '@/lib/utils'
import type { Post } from '@/lib/supabase'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const cardClasses = featured 
    ? "group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    : "group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"

  const imageHeight = featured ? 400 : 250

  return (
    <article className={cardClasses}>
      <Link href={`/posts/${post.slug}`} className="block">
        {post.featured_image && (
          <div className="relative overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              width={600}
              height={imageHeight}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority={featured}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}
        
        <div className={`p-${featured ? '8' : '6'}`}>
          {post.categories && (
            <div className="mb-3">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-200">
                {post.categories.name}
              </span>
            </div>
          )}
          
          <h2 className={`mb-3 font-bold text-gray-900 transition-colors group-hover:text-blue-600 ${
            featured ? 'text-2xl lg:text-3xl' : 'text-xl'
          }`}>
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="mb-4 text-gray-600 leading-relaxed">
              {truncateText(post.excerpt, featured ? 200 : 120)}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {post.authors && (
                <span className="font-medium">{post.authors.name}</span>
              )}
              <time dateTime={post.created_at || ''}>
                {formatDate(post.created_at)}
              </time>
            </div>
            
            {post.view_count && (
              <span className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{post.view_count.toLocaleString()}</span>
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}