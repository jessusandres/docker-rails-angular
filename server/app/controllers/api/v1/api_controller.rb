class Api::V1::ApiController < ApplicationController
  # For indagation
  # load_and_authorize_resource
  # skip_authorize_resource :only => [:home]
  # before_action :require_login
  def main_method
    puts "I'm Main method"
  end
end
