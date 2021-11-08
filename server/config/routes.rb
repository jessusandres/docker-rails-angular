Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'
  # get 'api/v1/hello', to: "home#hello"
  namespace :api do
    namespace :v1 do
      get 'hello' => 'home_api#hello'
      get 'users' => 'users#index'
      post 'users/queue' => 'users#queque_first'
      post 'users/email' => 'users#send_email'
      get 'cart' => 'cart#index'
      get 'home' => 'home_api#home'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  match '*path', to: 'home#index', via: :all
end
