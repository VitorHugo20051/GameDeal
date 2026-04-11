CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT,
    provider VARCHAR(50) DEFAULT 'local',
    provider_id TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    itad_id VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    last_fetched_at TIMESTAMP
);

CREATE TABLE prices (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    store VARCHAR(100),
    price NUMERIC(10, 2),
    currency VARCHAR(10) DEFAULT 'EUR',
    fetched_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE watchlist (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, game_id)
);