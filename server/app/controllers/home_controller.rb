class HomeController < ApplicationController
  def index
    print "DEV NAME ===> #{ENV['DEV_NAME']}"
    render file: "#{Rails.root}/web/index.html", layout: false
  end
end
