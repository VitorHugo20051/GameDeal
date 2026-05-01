import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getGamePrice } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

function GameCard({ game, index = 0 }) {
    const [cheapest, setCheapest] = useState(null);
    const [priceLoading, setPriceLoading] = useState(true);

    const imageUrl = game.assets?.banner400 || game.assets?.banner300
        || `https://assets.isthereanydeal.com/${game.id}/banner400.jpg`;

    useEffect(() => {
        let cancelled = false;
        async function fetchCheapest() {
            try {
                const deals = await getGamePrice(game.id);
                if (!cancelled && deals && deals.length > 0) {
                    const best = deals.reduce((min, d) => d.price < min.price ? d : min, deals[0]);
                    setCheapest(best);
                }
            } catch (e) {
            } finally {
                if (!cancelled) setPriceLoading(false);
            }
        }
        if (game.id && !game.id.startsWith('steam-')) fetchCheapest();
        else setPriceLoading(false);
        return () => { cancelled = true; };
    }, [game.id]);

    return (
        <motion.div
            className="game-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px var(--accent-glow)",
                borderColor: "rgba(139, 92, 246, 0.4)"
            }}
        >
            <div className="game-card-image">
                <motion.img
                    src={imageUrl}
                    alt={game.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('game-card-image-fallback');
                    }}
                />
            </div>

            <div className="game-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <h3 className="game-card-title">{game.title}</h3>
                    <AnimatePresence>
                        {!priceLoading && cheapest && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="game-card-price-tag"
                            >
                                {cheapest.price === 0 ? 'FREE' : `${cheapest.price} ${cheapest.currency}`}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ minHeight: '40px' }}>
                    {!priceLoading && cheapest ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700 }}>Best Deal</span>
                            <span style={{ fontSize: '14px', color: 'var(--accent2)', fontWeight: 600 }}>{cheapest.name}</span>
                        </div>
                    ) : (
                        !priceLoading && <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Check prices below</span>
                    )}
                    {priceLoading && <div className="skeleton" style={{ height: '20px', width: '60%' }}></div>}
                </div>

                <Link href={`/game/${game.id}?title=${encodeURIComponent(game.title)}&slug=${game.slug}`} style={{ width: '100%', marginTop: 'auto' }}>
                    <motion.button
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Details
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
}

export default GameCard;