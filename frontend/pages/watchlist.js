import { getWatchlist } from "@/lib/api";
import { useEffect, useState } from "react";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (watchlist.length === 0) {
    return <div>Your watchlist is empty.</div>;
  }

  function removeFromWatchlist(id) {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h1>Your Watchlist</h1>
      {watchlist.map((item) => (
        <div key={item.id} className="watchlist-item">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <button onClick={() => removeFromWatchlist(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}