import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface Auth0GuardProps {
  children: React.ReactNode
}

const Auth0Guard: React.FC<Auth0GuardProps> = ({ children }: Auth0GuardProps) => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-6 inline-block rounded-full bg-orange-100 p-4">
            <svg className="h-12 w-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Admin Access Required</h2>
          <p className="mb-8 text-gray-600">Sign in with your Auth0 account to continue.</p>
          <button
            onClick={() => loginWithRedirect()}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600 transition-colors"
          >
            Sign In with Auth0
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default Auth0Guard
