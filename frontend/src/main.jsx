import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="712548217029-1l1dpk5onh2iejlk7mo073bk1knhjmut.apps.googleusercontent.com">
  <React.StrictMode>
      <App />
  </React.StrictMode>
</GoogleOAuthProvider>,
)
