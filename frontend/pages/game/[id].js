import {} from "react";
import { useRouter } from "next/router";
import Game from "../../components/Game";
import { addToWatchlist } from "@/lib/api";

export default function GamePage() {
  const router = useRouter();
  const { id, title, slug } = router.query;

  return (
    <div className="animate-in">
      <div style={{marginBottom: '40px'}}>
        <button className="btn btn-ghost btn-sm mb-4" onClick={() => router.back()}>← Back</button>
        <div className="flex justify-between items-center" style={{flexWrap: 'wrap', gap: '16px'}}>
          <h1 style={{fontSize: '40px', color: 'var(--text)'}}>{title}</h1>
          <button className="btn btn-primary" onClick={async () => {
            await addToWatchlist({ itad_id: id, title, slug });
            router.push('/watchlist');
          }}>
            + Add to Watchlist
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