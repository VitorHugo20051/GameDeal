require 'httparty'
require 'dotenv/load'
require 'json'

class Game
  def self.search(query)
    begin
      url = "https://api.isthereanydeal.com/games/search/v1"
      response = HTTParty.get(url, query:{ key: ENV['ITAD_API_KEY'], title: query})
      if response.success? && response.parsed_response.is_a?(Array)
        response.parsed_response.map {|game| {id: game['id'], slug:game['slug'], title:game['title'], assets: game['assets'], mature: game['mature']} }
      else
        []
      end
    rescue => e
      puts "Error fetching search from ITAD: #{e.message}"
      []
    end
  end

  def self.price(itad_id)
    begin
      url ="https://api.isthereanydeal.com/games/prices/v3"
      response = HTTParty.post(url, query: {key:ENV['ITAD_API_KEY']}, body: [itad_id].to_json, headers: { 'Content-Type' => 'application/json' })
      
      parsed = response.parsed_response
      if response.success? && parsed.is_a?(Array) && parsed[0] && parsed[0]['deals']
        parsed[0]['deals'].map { |deal| {name:deal['shop']['name'], price:deal['price']['amount'], currency:deal['price']['currency'], url:deal['url']} }
      else
        []
      end
    rescue => e
      puts "Error fetching price from ITAD: #{e.message}"
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
      
      popular_games = []
      featured.each do |s_game|
        break if popular_games.length >= 9
        
        itad_results = self.search(s_game["name"])
        
        if itad_results.any?
          game = itad_results.first
          next if game[:mature]
          popular_games << game
        else
          popular_games << {
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