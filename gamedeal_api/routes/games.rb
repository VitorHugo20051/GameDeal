require_relative '../models/game'

get '/games/search' do
  content_type :json
  Game.search(params[:q]).to_json
end

get '/games/:id/prices' do
  content_type :json
  Game.price(params[:id]).to_json
end