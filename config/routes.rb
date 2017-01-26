Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resources :species, only: [:index]
    resources :search, only: [:index]
    resources :countries, only: [:index]
  end

  resources :search, only: [:index]

  namespace :jquery do
    resources :search, only: [:index]
  end

end
