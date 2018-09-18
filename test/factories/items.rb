# frozen_string_literal: true

# == Schema Information
#
# Table name: items
#
#  id          :bigint(8)        not null, primary key
#  name        :string           not null
#  price       :decimal(5, 2)    not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  brand_id    :bigint(8)        not null
#  category_id :bigint(8)        not null
#  color_id    :bigint(8)        not null
#  user_id     :bigint(8)        not null
#
# Indexes
#
#  index_items_on_brand_id     (brand_id)
#  index_items_on_category_id  (category_id)
#  index_items_on_color_id     (color_id)
#  index_items_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (brand_id => brands.id) ON DELETE => cascade
#  fk_rails_...  (category_id => categories.id) ON DELETE => cascade
#  fk_rails_...  (color_id => colors.id) ON DELETE => cascade
#  fk_rails_...  (user_id => users.id) ON DELETE => cascade
#

FactoryBot.define do
  factory :item do
    price       { rand(50..200) }
    brand       { Brand.random.first }
    category    { Category.random.first }
    color       { Color.random.first }
    user        { User.random.first }
    name        { [color.name, brand.name, category.name].join(' ') }
  end
end
