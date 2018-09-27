# frozen_string_literal: true

# == Schema Information
#
# Table name: outfit_items
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  item_id    :bigint(8)        not null
#  outfit_id  :bigint(8)        not null
#
# Indexes
#
#  index_outfit_items_on_item_id                (item_id)
#  index_outfit_items_on_item_id_and_outfit_id  (item_id,outfit_id) UNIQUE
#  index_outfit_items_on_outfit_id              (outfit_id)
#
# Foreign Keys
#
#  fk_rails_...  (item_id => items.id) ON DELETE => cascade
#  fk_rails_...  (outfit_id => outfits.id) ON DELETE => cascade
#

class OutfitItem < ApplicationRecord
  ## -------------------- Requirements -------------------- ##
  ## ----------------------- Scopes ----------------------- ##
  ## --------------------- Constants ---------------------- ##
  ## ----------------------- Enums ------------------------ ##
  ## -------------------- Associations -------------------- ##

  belongs_to :item
  belongs_to :outfit

  ## -------------------- Validations --------------------- ##

  validates :outfit_id, presence: true, uniqueness: { scope: :item_id }

  validate :max_items_per_outfit

  ## --------------------- Callbacks ---------------------- ##

  after_create_commit :update_outfit_total_price

  ## ------------------- Class Methods -------------------- ##
  ## ---------------------- Methods ----------------------- ##

  def max_items_per_outfit
    errors.add(:base, 'Max 6 items per outfit') if OutfitItem.where(outfit_id: outfit_id).count >= 6
  end

  def update_outfit_total_price
    outfit.set_total_price
    outfit.save
  end
end
