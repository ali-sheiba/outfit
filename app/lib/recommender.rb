# frozen_string_literal: true

class Recommender
  attr_reader :item, :color, :brand, :category, :data, :liked_outfits, :user, :limit

  def initialize(item_id, user_id = nil, limit = 5)
    @item = Item.find(item_id)
    @user = User.find(user_id)
    @liked_outfits = @user.liked_outfit_ids
    @color = @item.color_id
    @brand = @item.brand_id
    @category = @item.category_id
    @limit = limit
    @data = Outfit.all_to_h(user_id)
    @max_likes = Outfit.maximum(:likes_counter)
  end

  def perform
    @data.map do |o|
      o[:items].map do |i|
        %i[brand color category].map do |var|
          i[:score] += 1 if send(var) == i[var]
        end
        i[:score] += 3 if i[:score] == 3
      end

      o[:score] = o[:items].pluck(:score).sum

      next if o[:score] < 1

      o[:score] += (o[:likes].to_f / @max_likes)
      o[:score] += 2 if liked_outfits.include?(o[:id])
    end
    reorder_data
  end

  def reorder_data
    @data = @data.select { |o| o[:score] > 1 }
                 .sort_by { |o| o[:score] }
                 .reverse[0, limit]
  end

  def outfits
    Outfit.where(id: @data.pluck(:id))
  end

  def scores
    @data.map do |o|
      {
        id:    o[:id],
        score: o[:score],
        items: o[:items].map do |i|
          {
            id: i[:id],
            score: i[:score]
          }
        end
      }
    end
  end
end
