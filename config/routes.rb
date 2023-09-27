Rails.application.routes.draw do
  mount Motor::Admin => '/motor_admin'
  get 'pages/home'
  get 'pages/restricted'
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
