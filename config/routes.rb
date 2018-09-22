# frozen_string_literal: true

Rails.application.routes.draw do
  root 'pages#home'

  devise_for :users,
             controllers: {
               sessions: 'v1/auth/sessions',
               registrations: 'v1/auth/registrations',
               passwords: 'v1/auth/passwords'
             },
             path: 'v1/auth',
             defaults: { format: :json },
             path_names: { sign_in: 'login', sign_out: 'logout', registration: 'register' }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :v1, defaults: { format: :json } do
    # API Resources here
    resource :profile, only: %i[show update], path: :me

    resources :items do
      get :options, on: :collection
    end

    resources :outfits
  end

  match '*unmatched_route', via: :get, to: 'pages#home', format: false
end
