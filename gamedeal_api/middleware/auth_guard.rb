helpers do
  def authenticated!
    halt 401, { error: 'Não autenticado' }.to_json unless session[:user_id]
  end

  def current_user_id
    session[:user_id]
  end
end