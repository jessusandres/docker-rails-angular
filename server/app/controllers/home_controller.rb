class HomeController < ApplicationController
  def index
    render file: "#{Rails.root}/web/index.html", layout: false
  end

  def hello
    render json: {ok: true, message: 'Hello from rails'}
  end
end
