import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link href="/">GameDeal</Link>
      </div>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/watchlist" className="btn btn-ghost btn-sm">Watchlist</Link>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 500 }}>
              Olá, <span style={{ color: 'var(--accent2)', fontWeight: 700 }}>{user.username}</span>
            </span>
            <button onClick={logout} className="btn btn-ghost btn-sm">Logout</button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px', borderLeft: '1px solid var(--border)' }}>
            <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
