import { getWatchlist } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const data = await getWatchlist();
        setWatchlist(data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, []);

  function removeFromWatchlist(id) {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((item) => item.id !== id));
  }

  if (loading) {
    return <div className="text-center mt-4" style={{padding: '64px'}}><span className="spinner"></span></div>;
  }

  if (watchlist.length === 0) {
    return (
      <div className="text-center animate-in" style={{padding: '64px 20px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', marginTop: '32px'}}>
        <h2 style={{color: 'var(--accent)', fontSize: '32px', marginBottom: '16px'}}>Your Watchlist is Empty</h2>
        <p style={{color: 'var(--muted)', fontSize: '18px', marginBottom: '32px'}}>You haven't tracked any deals yet.</p>
        <Link href="/" className="btn btn-primary">Discover Games</Link>
      </div>
    );
  }

  return (
    <div className="animate-in">
      <div style={{marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h1 style={{fontSize: '36px', color: 'var(--text)'}}>Your Watchlist</h1>
        <span className="badge badge-accent">{watchlist.length} Games</span>
      </div>
      
      <div className="grid-cards">
        {watchlist.map((item) => (
          <div key={item.id} className="card" style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <h2 style={{fontSize: '20px', fontWeight: 600, color: 'var(--accent2)'}}>{item.title}</h2>
            <p style={{color: 'var(--muted)', fontSize: '14px', flexGrow: 1}}>{item.description}</p>
            <div className="flex justify-between items-center" style={{marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)'}}>
              <Link href={`/game/${item.id}?title=${encodeURIComponent(item.title)}&slug=${item.slug}`} className="btn btn-primary btn-sm">
                  View Game
              </Link>
              <button className="btn btn-danger btn-sm" onClick={() => removeFromWatchlist(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}