import { useState } from "react";
import { useRouter } from "next/router";
import Game from "../../components/Game";
import { addToWatchlist } from "@/lib/api";
import { useToast } from "@/components/Toast";

export default function GamePage() {
  const router = useRouter();
  const { id, title, slug } = router.query;
  const { addToast } = useToast();
  const [adding, setAdding] = useState(false);

  async function handleAddToWatchlist() {
    setAdding(true);
    try {
      await addToWatchlist({ itad_id: id, title, slug });
      router.push(`/watchlist?added=${encodeURIComponent(title)}`);
    } catch (err) {
      addToast("Error adding to watchlist!", 'error');
      setAdding(false);
    }
  }

  return (
    <div className="animate-in">
      <div style={{marginBottom: '40px'}}>
        <button className="btn btn-ghost btn-sm mb-4" onClick={() => router.back()}>← Back</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <h1 style={{fontSize: '40px', color: 'var(--text)'}}>{title}</h1>
          <button className="btn btn-primary" onClick={handleAddToWatchlist} disabled={adding}>
            {adding ? <><span className="spinner" style={{width: '16px', height: '16px'}}></span> Adding...</> : '+ Add to Watchlist'}
          </button>
        </div>
      </div>
      <div>
        <h2 style={{fontSize: '24px', marginBottom: '24px', color: 'var(--muted)'}}>Available Deals</h2>
        <Game gameId={id} />
      </div>
    </div>
  );
}