# frozen_string_literal: true

# == Schema Information
#
# Table name: outfit_likes
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  outfit_id  :bigint(8)        not null
#  user_id    :bigint(8)        not null
#
# Indexes
#
#  index_outfit_likes_on_outfit_id              (outfit_id)
#  index_outfit_likes_on_user_id                (user_id)
#  index_outfit_likes_on_user_id_and_outfit_id  (user_id,outfit_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (outfit_id => outfits.id) ON DELETE => cascade
#  fk_rails_...  (user_id => users.id) ON DELETE => cascade
#

class OutfitLike < ApplicationRecord
  ## -------------------- Requirements -------------------- ##
  ## ----------------------- Scopes ----------------------- ##
  ## --------------------- Constants ---------------------- ##
  ## ----------------------- Enums ------------------------ ##
  ## -------------------- Associations -------------------- ##

  belongs_to :user
  belongs_to :outfit, counter_cache: :likes_counter

  ## -------------------- Validations --------------------- ##

  validates :outfit_id, presence: true, uniqueness: { scope: :user_id, message: 'Already liked this outfit' }

  ## --------------------- Callbacks ---------------------- ##
  ## ------------------- Class Methods -------------------- ##
  ## ---------------------- Methods ----------------------- ##
end
