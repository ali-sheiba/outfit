# frozen_string_literal: true

class Recommender
  CHECK_KEYS = %i[brand color category].freeze

  attr_reader :item, :data, :user, :limit

  def initialize(item_id, user_id = nil, limit = 5)
    @item = Item.find(item_id)
    @user = User.find(user_id)
    @limit = limit
    @data = build_outfits_hash
  end

  def perform
    data.map do |o|
      o[:items].map do |i|
        # Add 1 point for each match of the main keys
        CHECK_KEYS.map { |var| i[:score] += 1 if send(var) == i[var] }
      end

      # Outfit score = sum of all items points
      o[:score] += o[:items].pluck(:score).sum

      # Add 1 point for outfits that been liked by the user
      o[:score] += 1 if liked_outfits.include?(o[:id])

      # Check Outfit popularity by likes ( outfit likes / total users )
      o[:score] += (o[:likes].to_f / users_count)
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

  # retun item objects of matched ouffits
  def items
    Item.where(id: suggested_items.pluck(:id))
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

  private

  # Get items of matched outfits
  # and select the lower 10 items on scores of other categories
  def suggested_items
    data.pluck(:items)
        .flatten
        .reject { |i| i[:category] == category }
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
    of = Outfit.includes(:likes, :items)
    of.where(items: { color_id: color })
      .or(of.where(items: { brand_id: brand }))
      .or(of.where(items: { category_id: category }))
      .or(of.where(outfit_likes: { user_id: user.id }))
      .where.not(user_id: user.id)
      .distinct
  end

  # Convert outfits and items objects into hash with initial scores
  def build_outfits_hash
    all_outfits.map do |o|
      {
        id: o.id,
        score: 0.0,
        likes: o.likes_counter,
        items: o.items.map do |i|
          {
            id: i.id,
            brand: i.brand_id,
            category: i.category_id,
            color: i.color_id,
            score: 0.0
          }
        end
      }
    end
  end
end
