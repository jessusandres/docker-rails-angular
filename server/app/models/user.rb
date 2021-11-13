class User < ApplicationRecord
  has_secure_password
  has_secure_password :recovery_password, validations: false

  # Creation example: 
  # User.create({ email: 'jaccspanki@gmail.com', nick: 'ares14', password: 'angie1234', recovery_password: 'example@1234' })
end
