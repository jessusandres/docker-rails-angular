class Api::V1::UsersController < Api::V1::ApiController
  # before_action :require_login, except: [:queque_first, :send_email]
  # skip_load_and_authorize_resource :only => [:queque_first, :send_email]

  def index
    # puts "Current user: #{logged_in?}"
    users = User.all
    render json: { message: 'HELLO', family: %w[Giovanna Jhesus Luigui Mateo Lucila Jorge Angie Jesús Yerik], users: users }
  end

  # def validate
  #   render json: { user: nil }
  # end

  # def queque_first
  #   puts "=========> IN QUEUE"
  #   puts "env: #{ENV["REDIS_URL"]}"
  #   Resque.enqueue_at(1.minutes.from_now,Messages, 'Jesús Andrés')
  #   render json: { message: 'To queque' }
  # end

  # def send_email
  #   # NotificationMailer.test_email('jaccspanki@gmail.com', 'Hello from Rails').deliver_now
  #   NotificationMailer.with(content: 'Hello from Rails').test_email.deliver_now
  # end
end
