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

FactoryBot.define do
  factory :outfit_item do
    outfit { Outfit.random.first }
    item   { outfit.user.items.random.first }
  end
end
