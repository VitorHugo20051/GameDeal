import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getGamePrice } from '@/lib/api';

function GameCard({ game }) {
    const [cheapest, setCheapest] = useState(null);
    const [priceLoading, setPriceLoading] = useState(true);

    // Use assets from search API, or construct URL from game ID for watchlist items
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
                // silently fail
            } finally {
                if (!cancelled) setPriceLoading(false);
            }
        }
        if (game.id) fetchCheapest();
        return () => { cancelled = true; };
    }, [game.id]);

    return (
        <div className="card game-card">
            <div className="game-card-image">
                <img 
                    src={imageUrl} 
                    alt={game.title}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('game-card-image-fallback');
                    }}
                />
                <div className="game-card-overlay">
                    <span className="badge badge-accent">Game</span>
                </div>

            </div>
            <div className="game-card-body">
                <h3 className="game-card-title">{game.title}</h3>
                {!priceLoading && cheapest && (
                    <div className="game-card-price-row">
                        <span className="game-card-price-label">From</span>
                        <span className="game-card-price-value">
                            {cheapest.price === 0 ? 'FREE' : `${cheapest.price} ${cheapest.currency}`}
                        </span>
                        <span className="game-card-store">@ {cheapest.name}</span>
                    </div>
                )}
                {priceLoading && (
                    <div className="game-card-price-row">
                        <span className="game-card-price-label" style={{ color: 'var(--muted)' }}>
                            <span className="spinner" style={{ width: '12px', height: '12px' }}></span>
                        </span>
                    </div>
                )}
                <Link href={`/game/${game.id}?title=${encodeURIComponent(game.title)}&slug=${game.slug}`} className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default GameCard;