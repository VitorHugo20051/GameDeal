require 'httparty'
require 'dotenv/load'

class Game
  def self.search(query)
    url = "https://api.isthereanydeal.com/games/search/v1"
    response_from_itad = HTTParty.get(url, query:{ key: ENV['ITAD_API_KEY'], title: query})
    response_from_itad.map {|game| {id: game['id'], slug:game['slug'], title:game['title']} }
  end
end