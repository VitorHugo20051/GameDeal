require 'httparty'
require 'dotenv/load'
require 'json'

class Game
  def self.search(query)
    url = "https://api.isthereanydeal.com/games/search/v1"
    response_from_itad = HTTParty.get(url, query:{ key: ENV['ITAD_API_KEY'], title: query})
    response_from_itad.map {|game| {id: game['id'], slug:game['slug'], title:game['title'], assets: game['assets']} }
  end

  def self.price(itad_id)
    url ="https://api.isthereanydeal.com/games/prices/v3"
    response = HTTParty.post(url, query: {key:ENV['ITAD_API_KEY']}, body: [itad_id].to_json, headers: { 'Content-Type' => 'application/json' })
    
    parsed = response.parsed_response
    if parsed.is_a?(Array) && parsed[0] && parsed[0]['deals']
      parsed[0]['deals'].map { |deal| {name:deal['shop']['name'], price:deal['price']['amount'], currency:deal['price']['currency'], url:deal['url']} }
    else
      []
    end
  end

  def self.find_or_create(itad_id, title, slug)
    game_id =db.exec_params('SELECT * FROM games WHERE itad_id = $1', [itad_id]).first
    if game_id
      game_id
    else
      db.exec_params('INSERT INTO games (itad_id, slug, title) VALUES ($1, $2, $3) RETURNING id', [itad_id, slug, title]).first
    end
  end

  @@cache = { data: nil, expires_at: Time.now }

  def self.popular
    if @@cache[:data] && @@cache[:expires_at] > Time.now
      return @@cache[:data]
    end

    begin
      steam_url = "https://store.steampowered.com/api/featured/"
      steam_response = HTTParty.get(steam_url)
      return [] unless steam_response.success?

      featured = steam_response.parsed_response["featured_win"] || []
      
      popular_games = featured.first(9).map do |s_game|
        itad_results = self.search(s_game["name"])
        
        if itad_results.any?
          itad_results.first
        else
          {
            "id" => "steam-#{s_game["id"]}",
            "slug" => s_game["name"].downcase.gsub(/[^a-z0-9]/, '-').squeeze('-'),
            "title" => s_game["name"],
            "assets" => {
              "banner400" => s_game["large_capsule_image"] || s_game["header_image"]
            }
          }
        end
      end

      @@cache = { data: popular_games, expires_at: Time.now + 3600 }
      popular_games
    rescue => e
      puts "Error fetching popular games: #{e.message}"
      []
    end
  end
end