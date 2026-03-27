import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
  } = useAuth0();

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050608', color: '#e8edf2', fontFamily: 'JetBrains Mono, monospace' }}>
        <div style={{ color: '#00e5d4', fontSize: '14px', letterSpacing: '2px' }}>LOADING AURION AUTH...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', background: '#0a0c0f', color: '#ff4757', textAlign: 'center' }}>
        <h2>Login Error</h2>
        <p>{error.message}</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050608', color: '#e8edf2', fontFamily: 'JetBrains Mono, monospace' }}>
        <div style={{ padding: '40px', background: '#0a0c0f', border: '1px solid rgba(0,229,212,0.1)', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ color: '#00e5d4', marginBottom: '20px', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '32px', letterSpacing: '2px' }}>AURION AUTH</h2>
          <p style={{ fontSize: '12px', color: 'rgba(232,237,242,0.4)', marginBottom: '24px' }}>Please login or sign up to access Mission Control</p>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button 
              onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
              style={{ padding: '10px 24px', background: 'transparent', color: '#00e5d4', border: '1px solid rgba(0,229,212,0.4)', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Sign up
            </button>
            <button 
              onClick={() => loginWithRedirect()}
              style={{ padding: '10px 24px', background: '#00e5d4', color: '#050608', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
