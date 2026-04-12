import { searchGames } from '@/lib/api';
import { useState } from 'react';
import GameCard from '@/components/GameCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={() => {
        searchGames(query)
          .then(data => setGames(data));
      }}>Search</button>
      <ul>
        {games.map(game => (
          <li key={game.title}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
}