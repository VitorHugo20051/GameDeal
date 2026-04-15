require 'pg'
require 'dotenv/load'

def db
  PG.connect(
    host: ENV['DB_HOST'] || 'localhost',
    dbname: ENV['DB_NAME'] || 'gamedeal_db',
    user: ENV['DB_USER'] || 'postgres',
    password: ENV['DB_PASSWORD'] || 'admin'
  )
end