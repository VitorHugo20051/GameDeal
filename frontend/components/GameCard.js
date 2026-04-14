import Link from 'next/link';

function GameCard({ game }) {
    return (
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', transition: 'transform 0.2s', cursor: 'pointer' }}
             onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <h3 style={{ fontSize: '18px', marginBottom: 'auto', fontWeight: 600 }}>
                {game.title}
            </h3>
            <div className="flex justify-between items-center" style={{ marginTop: '16px' }}>
                <span className="badge badge-accent">Game</span>
                <Link href={`/game/${game.id}?title=${encodeURIComponent(game.title)}&slug=${game.slug}`} className="btn btn-primary btn-sm">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default GameCard;