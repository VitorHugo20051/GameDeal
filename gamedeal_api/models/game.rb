require 'httparty'
require 'dotenv/load'
require 'json'

class Game
  def self.search(query)
    url = "https://api.isthereanydeal.com/games/search/v1"
    response_from_itad = HTTParty.get(url, query:{ key: ENV['ITAD_API_KEY'], title: query})
    response_from_itad.map {|game| {id: game['id'], slug:game['slug'], title:game['title']} }
  end

  def self.price(itad_id)
    url ="https://api.isthereanydeal.com/games/prices/v3"
    request_for_itad = HTTParty.post(url, query: {key:ENV['ITAD_API_KEY']}, body: [itad_id].to_json, headers: { 'Content-Type' => 'application/json' })
    request_for_itad[0]['deals'].map {|deal|{name:deal['shop']['name'], price:deal['price']['amount'], currency:deal['price']['currency'], url:deal['url']}}
  end

  def self.find_or_create(itad_id, title, slug)
    game_id =db.exec_params('SELECT * FROM games WHERE itad_id = $1', [itad_id]).first
    if game_id
      game_id
    else
      db.exec_params('INSERT INTO games (itad_id, slug, title) VALUES ($1, $2, $3) RETURNING id', [itad_id, slug, title]).first
    end
  end
end