import { searchGames, getPopularGames } from '@/lib/api';
import { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function loadPopular() {
      try {
        const data = await getPopularGames();
        setPopularGames(data);
      } catch (e) {
        console.error(e);
      } finally {
        setInitialLoading(false);
      }
    }
    loadPopular();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.q) {
        setQuery(router.query.q);
        const fetchSearch = async () => {
          setLoading(true);
          try {
            const data = await searchGames(router.query.q);
            setGames(data);
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        };
        fetchSearch();
      } else {
        setGames([]);
      }
    }
  }, [router.isReady, router.query.q]);

  const handleSearch = () => {
    if (!query) {
      router.push('/', undefined, { shallow: true });
    } else {
      router.push(`/?q=${encodeURIComponent(query)}`, undefined, { shallow: true });
    }
  };

  const handleClear = () => {
    setQuery('');
    router.push('/', undefined, { shallow: true });
  };

  return (
    <div className="container">
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="hero-title">Level Up Your Savings</h1>
        <p className="hero-subtitle">
          The ultimate engine to track deals across all major stores.
          Never pay full price for a game again.
        </p>
        <motion.div
          style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', zIndex: 10 }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              className="input"
              placeholder="Search for any game..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <motion.button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? <span className="spinner"></span> : 'Search Deals'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence mode='wait'>
        {games.length > 0 ? (
          <motion.div
            key="search-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '28px' }}>Search Results</h2>
              <button className="btn btn-ghost btn-sm" onClick={handleClear}>Clear</button>
            </div>
            <div className="grid-cards">
              {games.map((game, i) => (
                <GameCard key={game.id || game.title} game={game} index={i} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="trending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ marginTop: '48px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent2)', boxShadow: '0 0 10px var(--accent2)' }}></div>
              <h2 style={{ fontSize: '32px' }}>Trending Right Now</h2>
            </div>

            {initialLoading ? (
              <div className="grid-cards">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <div key={i} className="game-card" style={{ height: '350px' }}>
                    <div className="skeleton" style={{ height: '180px', borderRadius: '0' }}></div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="skeleton" style={{ height: '24px', width: '80%' }}></div>
                      <div className="skeleton" style={{ height: '16px', width: '40%' }}></div>
                      <div className="skeleton" style={{ height: '40px', width: '100%', marginTop: 'auto' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid-cards">
                {popularGames.map((game, i) => (
                  <GameCard key={game.id} game={game} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}