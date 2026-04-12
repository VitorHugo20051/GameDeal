import { searchGames } from '@/lib/api';
import { useState } from 'react';

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
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
    </div>
  );
}