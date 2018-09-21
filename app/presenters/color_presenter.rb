# frozen_string_literal: true

module ColorPresenter
  extend ActiveSupport::Concern

  included do
    acts_as_api

    api_accessible :base do |t|
      t.add :id
      t.add :name
    end

    api_accessible :index, extend: :base

    api_accessible :show, extend: :index do |t|
      t.add :created_at
      t.add :updated_at
    end

    api_accessible :options do |t|
      t.add :id
      t.add :name
    end
  end
end
