require_relative '../models/game'

get '/games/search' do
  content_type :json
  Game.search(params[:q]).to_json
end

get '/games/:id/prices' do
  content_type :json
  Game.price(params[:id]).to_json
end

get '/games/popular' do
  content_type :json
  [
    {
      "id" => "018d937f-2997-7131-b8b9-7c8af4825fa8",
      "slug" => "cyberpunk-2077",
      "title" => "Cyberpunk 2077",
      "assets" => {
        "boxart" => "https://assets.isthereanydeal.com/018d937f-2997-7131-b8b9-7c8af4825fa8/boxart.jpg?t=1769691019",
        "banner400" => "https://assets.isthereanydeal.com/018d937f-2997-7131-b8b9-7c8af4825fa8/banner400.jpg?t=1769691019"
      }
    },
    {
      "id" => "018d937f-590c-728b-ac35-38bcff85f086",
      "slug" => "elden-ring",
      "title" => "Elden Ring",
      "assets" => {
        "boxart" => "https://assets.isthereanydeal.com/018d937f-590c-728b-ac35-38bcff85f086/boxart.jpg?t=1767885314",
        "banner400" => "https://assets.isthereanydeal.com/018d937f-590c-728b-ac35-38bcff85f086/banner400.jpg?t=1767885314"
      }
    },
    {
      "id" => "018d937f-3a3b-7210-bd2d-0d1dfb1d84c0",
      "slug" => "red-dead-redemption-2",
      "title" => "Red Dead Redemption 2",
      "assets" => {
        "boxart" => "https://assets.isthereanydeal.com/018d937f-3a3b-7210-bd2d-0d1dfb1d84c0/boxart.jpg?t=1760981447",
        "banner400" => "https://assets.isthereanydeal.com/018d937f-3a3b-7210-bd2d-0d1dfb1d84c0/banner400.jpg?t=1760981447"
      }
    },
    {
      "id" => "018d937f-03e2-7281-a961-037a2d279a92",
      "slug" => "grand-theft-auto-v",
      "title" => "Grand Theft Auto V",
      "assets" => {
        "boxart" => "https://assets.isthereanydeal.com/018d937f-03e2-7281-a961-037a2d279a92/boxart.jpg?t=1769719515",
        "banner400" => "https://assets.isthereanydeal.com/018d937f-03e2-7281-a961-037a2d279a92/banner400.jpg?t=1769719515"
      }
    },
    {
      "id" => "018d9584-24d6-7010-b82b-df1f0b154cc7",
      "slug" => "baldurs-gate-3",
      "title" => "Baldur's Gate 3",
      "assets" => {
        "boxart" => "https://assets.isthereanydeal.com/018d9584-24d6-7010-b82b-df1f0b154cc7/boxart.jpg?t=1773079503",
        "banner400" => "https://assets.isthereanydeal.com/018d9584-24d6-7010-b82b-df1f0b154cc7/banner400.jpg?t=1773079504"
      }
    },
    {
      "id" => "018d937f-1212-7232-b23f-a046f6fd4a57",
      "slug" => "the-witcher-3-wild-hunt",
      "title" => "The Witcher 3: Wild Hunt",
      "assets" => {
        "boxart" => "https://assets.isthereanydeal.com/018d937f-1212-7232-b23f-a046f6fd4a57/boxart.jpg?t=1768305010",
        "banner400" => "https://assets.isthereanydeal.com/018d937f-1212-7232-b23f-a046f6fd4a57/banner400.jpg?t=1768305010"
      }
    }
  ].to_json
end