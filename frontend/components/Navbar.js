import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link href="/">GameDeal</Link>
      </div>
      <div className="nav-links">
        <Link href="/watchlist" className="btn btn-ghost btn-sm">Watchlist</Link>
        {user ? (
          <>
            <span className="text-sm mr-2">Logged in as {user.email}</span>
            <button onClick={logout} className="btn btn-ghost btn-sm">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
