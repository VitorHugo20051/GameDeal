import { useState, useEffect } from "react";
import { getGamePrice } from "@/lib/api";

export default function Game({ gameId }) {
  const [gameDeals, setGameDeals] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;
      const response = await getGamePrice(gameId);
      setGameDeals(response);
    };

    fetchGame();
  }, [gameId]);

  if (!gameDeals) {
    return <div className="text-center mt-4" style={{padding: '64px'}}><span className="spinner"></span></div>;
  }
  
  if (gameDeals.length === 0) {
      return <div className="card text-center" style={{padding: '32px'}}><h3 style={{color: 'var(--muted)', fontSize: '18px'}}>No deals found at the moment.</h3></div>;
  }

  return (
    <div className="grid-cards">
    {gameDeals.map ((g, idx) => {
        return (
        <div className="card" key={g.id || idx} style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <h3 style={{fontSize: '18px', margin: 0, color: 'var(--text)'}}>{g.name}</h3>
            <div style={{fontSize: '28px', fontWeight: 700, color: 'var(--success)'}}>{g.price} <span style={{fontSize: '16px', fontWeight: 400, color: 'var(--muted)'}}>{g.currency}</span></div>
            <a href={g.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{marginTop: 'auto', justifyContent: 'center', padding: '12px'}}>Check Store Deal</a>
        </div>);
    })}
    </div>
  );
}
