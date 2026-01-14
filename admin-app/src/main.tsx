import React from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import './index.css'

const auth0Domain = process.env.AUTH0_DOMAIN
const auth0ClientId = process.env.AUTH0_CLIENT_ID

if (!auth0Domain || !auth0ClientId) {
  console.error('Auth0 environment variables not found. Make sure AUTH0_DOMAIN and AUTH0_CLIENT_ID are set in Netlify.')
}

function mountApp(){
  const el = document.getElementById('root')!
  createRoot(el).render(
    <React.StrictMode>
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  )
}

mountApp()
