require 'bcrypt'
require_relative '../db'

class User
  def self.create(username, email, password)
    password_hash = BCrypt::Password.create(password)
    db.exec_params(
      'INSERT INTO users (username, email, password_hash, provider) VALUES ($1, $2, $3, $4) RETURNING id, username, email',
      [username, email, password_hash, 'local']
    ).first
  rescue PG::UniqueViolation
    nil
  end

  def self.find_by_email(email)
    db.exec_params('SELECT * FROM users WHERE email = $1', [email]).first
  end

  def self.find_by_username(username)
    db.exec_params('SELECT * FROM users WHERE username = $1', [username]).first
  end

  def self.find_by_id(id)
    db.exec_params('SELECT * FROM users WHERE id = $1', [id]).first
  end

  def self.authenticate(email, password)
    user = find_by_email(email)
    return nil unless user
    BCrypt::Password.new(user['password_hash']) == password ? user : nil
  end
end