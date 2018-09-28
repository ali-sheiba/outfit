# frozen_string_literal: true

module OutfitPresenter
  extend ActiveSupport::Concern

  included do
    acts_as_api

    api_accessible :base do |t|
      t.add :id
      t.add :name
    end

    api_accessible :index, extend: :base do |t|
      t.add :items,    template: :index
      t.add :item_ids, template: :index
      t.add :total_price
    end

    api_accessible :show, extend: :index do |t|
      t.add :created_at
      t.add :updated_at
    end

    api_accessible :explore, extend: :index do |t|
      t.remove :item_ids
      t.add :created_at
      t.add :user,          template: :base
      t.add :likes_counter, as: :likes
      t.add ->(outfit, options) { options[:liked_outfit_ids].include?(outfit.id) }, as: :liked
    end

    api_accessible :recommended, extend: :explore do |t|
      t.add ->(outfit, options) { options[:scores].find { |i| i[:id] == outfit.id }[:score] }, as: :score
    end
  end
end
