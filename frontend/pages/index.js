import { searchGames } from '@/lib/api';
import { useState } from 'react';
import GameCard from '@/components/GameCard';
import Link from 'next/link';

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
      <Link href="/register">Register</Link>
      <Link href="/login">Login</Link>
        
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