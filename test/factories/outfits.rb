# frozen_string_literal: true

# == Schema Information
#
# Table name: outfits
#
#  id            :bigint(8)        not null, primary key
#  likes_counter :integer          default(0), not null
#  name          :string           not null
#  total_price   :decimal(5, 2)    default(0.0), not null
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

FactoryBot.define do
  factory :outfit do
    user { User.random.first }
    name { Faker::Invoice.creditor_reference }
    after :create do |outfit|
      create :outfit_item, outfit: outfit
      create_list :outfit_item, [*2..5].sample, outfit: outfit
    end
  end
end
