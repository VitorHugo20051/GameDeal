require_relative '../models/user'
require 'uri'

post '/register' do
  content_type :json
  begin
    body = JSON.parse(request.body.read(4096))
  rescue JSON::ParserError, TypeError
    status 400
    return { error: 'JSON inválido ou demasiado grande' }.to_json
  end

  username, email, password = body['username'], body['email'], body['password']

  return { error: 'Username, email e password obrigatórios' }.to_json if username.nil? || email.nil? || password.nil?
  return { error: 'Dados inválidos' }.to_json unless username.is_a?(String) && email.is_a?(String) && password.is_a?(String)

  return { error: 'O email tem um formato inválido' }.to_json unless email.match?(URI::MailTo::EMAIL_REGEXP)
  return { error: 'A password deve ter pelo menos 8 caracteres' }.to_json if password.length < 8

  user = User.create(username, email, password)
  if user
    session[:user_id] = user['id']
    status 201
    { message: 'Conta criada', user: { id: user['id'], username: user['username'], email: user['email'] } }.to_json
  else
    status 409
    { error: 'Email ou username já registado' }.to_json
  end
end

post '/login' do
  content_type :json
  begin
    body = JSON.parse(request.body.read(4096))
  rescue JSON::ParserError, TypeError
    status 400
    return { error: 'JSON inválido ou demasiado grande' }.to_json
  end

  email, password = body['email'], body['password']
  
  return { error: 'Email e password obrigatórios' }.to_json if email.nil? || password.nil?
  return { error: 'Dados inválidos' }.to_json unless email.is_a?(String) && password.is_a?(String)

  user = User.authenticate(email, password)

  if user
    session[:user_id] = user['id']
    { message: 'Login com sucesso', user: { id: user['id'], username: user['username'], email: user['email'] } }.to_json
  else
    status 401
    { error: 'Credenciais inválidas' }.to_json
  end
end

post '/logout' do
  content_type :json
  session.clear
  { message: 'Logout com sucesso' }.to_json
end

get '/me' do
  content_type :json
  if session[:user_id]
    user = User.find_by_id(session[:user_id])
    if user
      { id: user['id'], username: user['username'], email: user['email'] }.to_json
    else
      session.clear
      status 401
      { error: 'Não autenticado' }.to_json
    end
  else
    status 401
    { error: 'Não autenticado' }.to_json
  end
end