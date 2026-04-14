import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link href="/">GameDeal</Link>
      </div>
      <div className="nav-links">
        <Link href="/watchlist" className="btn btn-ghost btn-sm">Watchlist</Link>
        <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
        <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
      </div>
    </nav>
  );
}
