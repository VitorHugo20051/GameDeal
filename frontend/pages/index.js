import { searchGames } from '@/lib/api';
import { useState } from 'react';
import GameCard from '@/components/GameCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await searchGames(query);
      setGames(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '64px 20px', background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--accent2)' }}>Find the Best Game Deals</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '32px' }}>Search across multiple stores to find the cheapest price for your favorite games.</p>
        
        <div style={{ display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto' }}>
          <input 
            className="input" 
            placeholder="Search for a game..." 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            style={{ padding: '14px 20px', fontSize: '16px' }}
          />
          <button className="btn btn-primary" onClick={handleSearch} disabled={loading} style={{ padding: '14px 24px', fontSize: '16px' }}>
            {loading ? <span className="spinner" style={{width: '20px', height: '20px'}}></span> : 'Search'}
          </button>
        </div>
      </div>
        
      {games.length > 0 && (
        <div className="grid-cards">
          {games.map(game => (
            <GameCard key={game.id || game.title} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}