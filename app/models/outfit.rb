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
  ## ----------------------- Scopes ----------------------- ##
  ## --------------------- Constants ---------------------- ##
  ## ----------------------- Enums ------------------------ ##
  ## -------------------- Associations -------------------- ##

  belongs_to :user

  has_many :outfit_items, dependent: :destroy
  has_many :items,        through: :outfit_items, source: :item

  ## -------------------- Validations --------------------- ##

  validates :name, presence: true

  ## --------------------- Callbacks ---------------------- ##
  ## ------------------- Class Methods -------------------- ##
  ## ---------------------- Methods ----------------------- ##
end
