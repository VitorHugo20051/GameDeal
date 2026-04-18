import Link from 'next/link';

function GameCard({ game }) {
    // Use assets from search API, or construct URL from game ID for watchlist items
    const imageUrl = game.assets?.banner400 || game.assets?.banner300 
        || `https://assets.isthereanydeal.com/${game.id}/banner400.jpg`;

    return (
        <div className="card game-card"
             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
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
                <Link href={`/game/${game.id}?title=${encodeURIComponent(game.title)}&slug=${game.slug}`} className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default GameCard;