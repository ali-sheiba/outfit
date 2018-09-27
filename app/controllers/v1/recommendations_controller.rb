# frozen_string_literal: true

class V1::RecommendationsController < V1::BaseController
  power :recommendations

  ## ------------------------------------------------------------ ##

  # POST : /v1/recommendations/
  def create
    return if missing_params!(:item_id)

    @rec = Recommender.new(params[:item_id], current_user.id)
    @rec.perform

    Rails.logger.debug(@rec.scores.to_json)

    data = {
      outfits: outfits,
      items: items
    }
    render_success(data: data)
  end

  ## ------------------------------------------------------------ ##

  private

  def template_injector
    {
      liked_outfit_ids: current_user.liked_outfit_ids,
      scores: @rec.scores
    }
  end

  def outfits
    @rec.outfits
        .with_associations
        .includes(:user)
        .as_api_response(:recommended, template_injector)
        .sort_by { |o| o[:score] }
        .reverse
  end

  def items
    @rec.items
        .with_associations
        .as_api_response(:base, template_injector)
  end
end
