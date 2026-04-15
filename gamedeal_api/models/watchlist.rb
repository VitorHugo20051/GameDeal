require_relative '../db'

class Watchlist
  def self.get_games(user_id)
    query = 'SELECT watchlist.*, games.title, games.slug, games.itad_id 
              FROM watchlist 
              JOIN games ON watchlist.game_id = games.id 
              WHERE watchlist.user_id = $1'
    db.exec_params(query, [user_id]).to_a
  end

  def self.add_game(user_id, game_data)
    game_id = Game.find_or_create(game_data['itad_id'], game_data['title'], game_data['slug'])
    db.exec_params('INSERT INTO watchlist (user_id, game_id) VALUES ($1, $2)', [user_id, game_id['id']])
  end

  def self.remove_game(user_id, game_id)
    db.exec_params('DELETE FROM watchlist WHERE user_id = $1 AND game_id = $2', [user_id, game_id])
  end
end