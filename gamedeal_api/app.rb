require 'sinatra'
require 'sinatra/reloader' if development?
require 'json'
require 'rack/cors'
require_relative 'middleware/auth_guard'
require_relative 'db'
require_relative 'routes/auth'
require_relative 'routes/games'
require_relative 'routes/watchlist'

enable :sessions
set :session_secret, ENV['SESSION_SECRET'] || 'dev_secret_muito_longo_para_desenvolvimento_local_muda_em_producao_obrigatorio'

use Rack::Cors do
  allow do
    origins 'http://localhost:3000'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end

get '/health' do
  content_type :json
  { status: 'ok' }.to_json
end