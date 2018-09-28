# frozen_string_literal: true

module ItemPresenter
  extend ActiveSupport::Concern

  included do
    acts_as_api

    api_accessible :base do |t|
      t.add :id
      t.add :name
      t.add :category, template: :base
      t.add :brand, template: :base
      t.add :color, template: :base
      t.add :price
      t.add :image_url
    end

    api_accessible :index, extend: :base

    api_accessible :show, extend: :index
  end
end
