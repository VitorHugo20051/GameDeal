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
end