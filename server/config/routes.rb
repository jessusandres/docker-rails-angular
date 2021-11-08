Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'
  get 'api/v1/hello', to: "home#hello"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
