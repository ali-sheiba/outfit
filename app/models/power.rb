# frozen_string_literal: true

class Power
  include Consul::Power

  attr_reader :current_user

  def initialize(current_user)
    @current_user = current_user
  end

  # Generate powers for all tables and by default prevent them all from access
  ActiveRecord::Base.connection.tables.map(&:to_sym) - %i[schema_migrations ar_internal_metadata].each do |model|
    power model do
      false
    end
  end

  ######################## V1::ProfilesController #######################

  power :profile do
    current_user
  end

  ######################## V1::ItemsController #######################

  power :items do
    current_user.items
                .includes(:category, :brand, :color)
  end

  ######################## V1::OutfitsController #######################

  power :outfits do
    current_user.outfits
                .includes(items: %i[category brand color])
  end

  ######################## V1::ExploresController #######################

  power :explores do
    Outfit.includes(:user, items: %i[category brand color])
          .where.not(user_id: current_user.id)
  end
end
