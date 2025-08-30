'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Post {
  id: string
  title: string
  content: string
  published: boolean
  created_at: string
  users: {
    full_name: string | null
    profiles: {
      username: string | null
    }[]
  }
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data: posts, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          published,
          created_at,
          users:user_id (
            full_name,
            profiles (
              username
            )
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setPosts(posts || [])
      }
    } catch (err) {
      setError('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4 bg-red-50 rounded-md">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
      
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No posts found. Create your first post!
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content.substring(0, 150)}...
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  By {post.users?.profiles?.[0]?.username || post.users?.full_name || 'Anonymous'}
                </span>
                <time dateTime={post.created_at}>
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}