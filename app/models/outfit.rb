# frozen_string_literal: true

# == Schema Information
#
# Table name: outfits
#
#  id            :bigint(8)        not null, primary key
#  likes_counter :integer          default(0), not null
#  name          :string           not null
#  total_price   :decimal(6, 2)    default(0.0), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint(8)        not null
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

  has_many :likes, class_name: 'OutfitLike', dependent: :destroy

  ## -------------------- Validations --------------------- ##

  validates :name, presence: true

  validate :max_outfits_per_user

  ## --------------------- Callbacks ---------------------- ##

  after_validation :set_total_price

  ## ------------------- Class Methods -------------------- ##

  def self.all_to_h(user_id = nil)
    where.not(user_id: user_id)
         .includes(:items)
         .as_api_response(:recommendations)
  end

  ## ---------------------- Methods ----------------------- ##

  def max_outfits_per_user
    errors.add(:base, 'Max 10 outfits per user') if Outfit.where(user_id: user_id).count > 10
  end

  def set_total_price
    self.total_price = items.sum(:price)
  end

  def like!(user)
    likes.create(user: user)
  end

  def unlike!(user)
    likes.find_by(user_id: user.id)&.destroy
  end

  def toggle_like!(user)
    if liked?(user)
      unlike!(user)
      false
    else
      like!(user)
      true
    end
  end

  def liked?(user)
    likes.exists?(user_id: user.id)
  end
end
