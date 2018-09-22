# frozen_string_literal: true

# == Schema Information
#
# Table name: outfits
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint(8)        not null
#
# Indexes
#
#  index_outfits_on_name     (name)
#  index_outfits_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id) ON DELETE => cascade
#

class Outfit < ApplicationRecord
  ## -------------------- Requirements -------------------- ##

  include OutfitPresenter

  ## ----------------------- Scopes ----------------------- ##
  ## --------------------- Constants ---------------------- ##
  ## ----------------------- Enums ------------------------ ##
  ## -------------------- Associations -------------------- ##

  belongs_to :user

  has_many :outfit_items, dependent: :destroy
  has_many :items,        through: :outfit_items

  ## -------------------- Validations --------------------- ##

  validates :name, presence: true

  validate :max_outfits_per_user

  ## --------------------- Callbacks ---------------------- ##
  ## ------------------- Class Methods -------------------- ##

  def self.all_to_h
    all.includes(:items)
       .map do |o|
         {
           id: o.id,
           items: o.items.map do |i|
                    {
                      id: i.id,
                      brand: i.brand_id,
                      color: i.color_id,
                      catagory: i.category_id
                    }
                  end
         }
       end
  end

  ## ---------------------- Methods ----------------------- ##

  def max_outfits_per_user
    errors.add(:base, 'Max 10 outfits per user') if Outfit.where(user_id: user_id).count >= 10
  end

  def total_price
    items.sum(:price)
  end
end
