# frozen_string_literal: true

class Recommender
  attr_reader :item, :data, :user, :limit

  def initialize(item_id, user_id = nil, limit = 5)
    @item = Item.find(item_id)
    @user = User.find(user_id)
    @limit = limit
    @data = all_outfits.as_api_response(:recommendations)
  end

  def perform
    data.map do |o|
      o[:items].map do |i|
        %i[brand color category].map { |var| i[:score] += 1 if send(var) == i[var] }
        i[:score] += 3 if i[:score] == 3
      end

      o[:score] = o[:items].pluck(:score).sum

      next if o[:score] < 1

      o[:score] += (o[:likes].to_f / users_count)
      o[:score] += 2 if liked_outfits.include?(o[:id])
    end
    reorder_data
  end

  # Sort data based on outfit scores [ to 10 outfits ]
  def reorder_data
    @data = data.select { |o| o[:score] > 1 }
                .sort_by { |o| o[:score] }
                .reverse[0, limit]
  end

  # return matched outfits objects
  def outfits
    Outfit.where(id: data.pluck(:id))
  end

  # This block is used for debugging and show the total score
  # Will show the outfit score in api response, and this block will br logged
  def scores
    data.map do |o|
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

  # retun item objects of matched ouffits
  def items
    Item.where(id: matched_outfit_items.pluck(:id))
  end

  private

  # Get items of matched outfits
  # and select the lower 10 items on scores
  def matched_outfit_items
    data.pluck(:items)
        .flatten
        .sort_by { |i| i[:score] }[0..10]
  end

  # Count All users, value will be used in formula
  def users_count
    @users_count ||= User.count
  end

  # Get user liked outfits ids
  def liked_outfits
    @liked_outfits ||= user.liked_outfit_ids
  end

  def color
    @color ||= item.color_id
  end

  def brand
    @brand ||= item.brand_id
  end

  def category
    @category ||= item.category_id
  end

  # Fitch outfits that have any match of
  # - Category - Brand - Color - Liked by User
  def all_outfits
    of = Outfit.includes(:outfit_items, :likes, items: %i[color brand category])
    of.where(colors: { id: color })
      .or(of.where(brands: { id: brand }))
      .or(of.where(categories: { id: category }))
      .or(of.where(outfit_likes: { user_id: user.id }))
      .where.not(user_id: user.id)
      .distinct
  end
end
