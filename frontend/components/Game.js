import { useState, useEffect } from "react";
import { getGamePrice } from "@/lib/api";

export default function Game({ gameId }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await getGamePrice(gameId);
      setGame(response);
    };

    fetchGame();
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    {game.map ((g) => {
        return (<div key={g.id}>
            <h2>{g.name}</h2>
            <p>Price: {g.price} {g.currency}</p>
            <a href={g.url} target="_blank" rel="noopener noreferrer">View Deal</a>
        </div>);
    })}
    </div>
  );
}
