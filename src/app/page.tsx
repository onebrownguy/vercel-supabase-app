'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import AuthForm from '@/components/AuthForm'
import PostsList from '@/components/PostsList'
import { getCurrentUser, signOut } from '@/lib/auth'
import type { User } from '@supabase/supabase-js'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { user } = await getCurrentUser()
    setUser(user)
    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/next.svg"
                alt="Next.js logo"
                width={120}
                height={25}
                priority
                className="dark:invert"
              />
              <span className="text-2xl font-bold text-gray-900">+ Supabase</span>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Next.js 15 + Supabase Integration
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A modern full-stack application with authentication, database, and API routes.
            Built with Next.js 15, React 19, TypeScript, and Supabase.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PostsList />
          </div>
          
          <div className="lg:col-span-1">
            {!user ? (
              <AuthForm />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Backend Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">✅ Authentication Working</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">✅ Database Connected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">✅ API Routes Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">✅ RLS Policies Enabled</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-900 mb-2">API Endpoints:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• GET /api/auth - Get current user</li>
                    <li>• POST /api/auth - Sign in/up</li>
                    <li>• GET /api/posts - List posts</li>
                    <li>• POST /api/posts - Create post</li>
                    <li>• GET /api/posts/[id] - Get post</li>
                    <li>• PUT /api/posts/[id] - Update post</li>
                    <li>• DELETE /api/posts/[id] - Delete post</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              Next.js Docs
            </a>
            <a
              href="https://supabase.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              Supabase Docs
            </a>
            <a
              href="https://github.com/onebrownguy/vercel-supabase-app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
