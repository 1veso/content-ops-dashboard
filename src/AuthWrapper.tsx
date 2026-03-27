import { useAuth0 } from "@auth0/auth0-react";
import type { ReactNode } from "react";

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
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050608', color: '#e8edf2', fontFamily: 'JetBrains Mono, monospace', position: 'relative' }}>
        
        {/* Ambient Cyan Glows */}
        <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,229,212,0.1) 0%, transparent 60%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        
        <div style={{ 
          position: 'relative',
          padding: '60px 50px', 
          background: 'rgba(10, 12, 15, 0.4)', 
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(0,229,212,0.3)', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(0,229,212,0.1), inset 0 0 20px rgba(0,229,212,0.05)'
        }}>
          <h2 style={{ 
            color: '#00e5d4', 
            marginBottom: '16px', 
            fontFamily: 'Barlow Condensed, sans-serif', 
            fontSize: '38px', 
            letterSpacing: '3px',
            textShadow: '0 0 20px rgba(0,229,212,0.6)'
          }}>AUTOMATA <span>OPS</span> Auth</h2>
          <p style={{ fontSize: '13px', color: 'rgba(232,237,242,0.6)', marginBottom: '32px', letterSpacing: '0.5px' }}>
            // secure proxy connection required
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
              style={{ padding: '12px 28px', background: 'rgba(0,229,212,0.05)', color: '#00e5d4', border: '1px solid rgba(0,229,212,0.4)', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '11px', boxShadow: '0 0 10px rgba(0,229,212,0.05)' }}
            >
              Sign up
            </button>
            <button 
              onClick={() => loginWithRedirect()}
              style={{ padding: '12px 28px', background: '#00e5d4', color: '#050608', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '11px', boxShadow: '0 0 20px rgba(0,229,212,0.4)' }}
            >
              Initialize Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
