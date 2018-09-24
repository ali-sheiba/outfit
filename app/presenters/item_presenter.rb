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

    api_accessible :recommendations do |t|
      t.add :id
      t.add :brand_id,    as: :brand
      t.add :color_id,    as: :color
      t.add :category_id, as: :category
      t.add ->(_) { 0.0 }, as: :score
    end
  end
end
