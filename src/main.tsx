import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import AuthWrapper from './AuthWrapper.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-c3e1we06mhdkbuuc.us.auth0.com"
      clientId="mcRu8LsnZdCYBVE3trK0SnOLzepqnH2r"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </Auth0Provider>
  </StrictMode>,
)
