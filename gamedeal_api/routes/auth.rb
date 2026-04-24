require_relative '../models/user'

post '/register' do
  content_type :json
  body = JSON.parse(request.body.read)
  username, email, password = body['username'], body['email'], body['password']

  return { error: 'Username, email e password obrigatórios' }.to_json if username.nil? || email.nil? || password.nil?

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
  body = JSON.parse(request.body.read)
  user = User.authenticate(body['email'], body['password'])

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