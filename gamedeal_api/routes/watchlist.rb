require_relative '../models/watchlist'

get '/watchlist' do
  authenticated!
  content_type :json
  games = Watchlist.get_games(session[:user_id])
  games.to_json
end

post '/watchlist' do
  authenticated!
  content_type :json
  game_data = JSON.parse(request.body.read)
  Watchlist.add_game(session[:user_id], game_data)
  { status: 'success', message: 'Game added to watchlist' }.to_json
end

delete '/watchlist/:game_id' do
  authenticated!
  content_type :json
  game_id = params['game_id']
  Watchlist.remove_game(session[:user_id], game_id)
  { status: 'success', message: 'Game removed from watchlist' }.to_json
end