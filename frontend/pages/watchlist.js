import { getWatchlist, removeFromWatchlist as apiRemove } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useToast } from "@/components/Toast";

import { useAuth } from "@/context/AuthContext";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const { user, loading: authLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish checking
    
    if (!user) {
      router.push('/login');
      return;
    }

    async function fetchWatchlist() {
      try {
        const data = await getWatchlist();
        if (!data) {
          router.push('/login');
          return;
        }
        setWatchlist(data);
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchWatchlist();
  }, [authLoading, user]);

  // Show toast if redirected here after adding a game
  useEffect(() => {
    if (router.query.added) {
      addToast(`"${router.query.added}" added to your watchlist!`, 'success');
      // Clean up the URL
      router.replace('/watchlist', undefined, { shallow: true });
    }
  }, [router.query.added]);

  async function handleRemove(game_id, title) {
    try {
      await apiRemove(game_id);
      addToast(`"${title}" removed from your watchlist`, 'info');
      const data = await getWatchlist();
      setWatchlist(data);
    } catch(err) {
      addToast("Error removing from watchlist!", 'error');
    }
  }

  if (loading) {
    return <div className="text-center mt-4" style={{ padding: '64px' }}><span className="spinner"></span></div>;
  }

  if (watchlist.length === 0) {
    return (
      <div className="text-center animate-in" style={{ padding: '64px 20px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', marginTop: '32px' }}>
        <h2 style={{ color: 'var(--accent)', fontSize: '32px', marginBottom: '16px' }}>Your Watchlist is Empty</h2>
        <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '32px' }}>You havent tracked any deals yet.</p>
        <Link href="/" className="btn btn-primary">Discover Games</Link>
      </div>
    );
  }

  return (
    <div className="animate-in">
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '36px', color: 'var(--text)' }}>Your Watchlist</h1>
        <span className="badge badge-accent">{watchlist.length} Games</span>
      </div>

      <div className="grid-cards">
        {watchlist.map((item) => {
          const imageUrl = `https://assets.isthereanydeal.com/${item.itad_id}/banner400.jpg`;
          return (
            <div key={item.game_id || item.id} className="card game-card">
              <div className="game-card-image">
                <img
                  src={imageUrl}
                  alt={item.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('game-card-image-fallback');
                  }}
                />
              </div>
              <div className="game-card-body">
                <h2 className="game-card-title">{item.title}</h2>
                {item.description && (
                  <p style={{ color: 'var(--muted)', fontSize: '14px', flexGrow: 1 }}>{item.description}</p>
                )}
                <div className="flex justify-between items-center" style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border)', gap: '8px' }}>
                  <Link href={`/game/${item.itad_id}?title=${encodeURIComponent(item.title)}&slug=${item.slug}`}>
                    <button className="btn btn-primary btn-sm">View Game</button>
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.game_id, item.title)}>Remove</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}