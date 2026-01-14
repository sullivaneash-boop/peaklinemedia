import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

function mountApp(){
  const el = document.getElementById('root')!
  createRoot(el).render(<React.StrictMode><App /></React.StrictMode>)
}

// Wait a short moment for the overlay script to set the global flag/sessionStorage
setTimeout(()=>{
  const authed = window.__PEAKLINE_ADMIN_AUTHED__ || sessionStorage.getItem('peakline_admin_authed_v1') === '1'
  if(authed){
    mountApp()
  } else {
    const el = document.getElementById('root')!
    el.innerHTML = '<div style="padding:48px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">Access denied: Please open <code>/admin/</code> and unlock the admin overlay.</div>'
  }
}, 150)
