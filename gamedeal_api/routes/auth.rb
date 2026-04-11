require_relative '../models/user'

post '/register' do
  content_type :json
  body = JSON.parse(request.body.read)
  email, password = body['email'], body['password']

  return { error: 'Email e password obrigatórios' }.to_json if email.nil? || password.nil?

  user = User.create(email, password)
  if user
    session[:user_id] = user['id']
    status 201
    { message: 'Conta criada', user: { id: user['id'], email: user['email'] } }.to_json
  else
    status 409
    { error: 'Email já registado' }.to_json
  end
end

post '/login' do
  content_type :json
  body = JSON.parse(request.body.read)
  user = User.authenticate(body['email'], body['password'])

  if user
    session[:user_id] = user['id']
    { message: 'Login com sucesso', user: { id: user['id'], email: user['email'] } }.to_json
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
    { user_id: session[:user_id] }.to_json
  else
    status 401
    { error: 'Não autenticado' }.to_json
  end
end