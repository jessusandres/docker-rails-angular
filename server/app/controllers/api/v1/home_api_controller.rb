class Api::V1::HomeApiController < Api::V1::ApiController

  # def home
  #   user = nil
  #   log_type = 'Public'
  #   if current_client
  #     user = current_client
  #     log_type = user.class.name
  #   elsif current_user
  #     user = current_user
  #     log_type = user.class.name
  #   end

  #   render json: { current_user: user, message: 'Welcome', token: '', user_type: log_type }
  # end

  def hello
    print "DEV NAME ===> #{ENV['DEV_NAME']}"
    render json: {ok: true, message: 'Hello from rails'}
  end
end
