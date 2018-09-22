# frozen_string_literal: true

class V1::ExploresController < V1::BaseController
  power :explores, as: :explores_scope

  before_action :find_resource, only: %i[show like]

  ## ------------------------------------------------------------ ##

  # GET : /v1/explores/
  # Inherited from V1::BaseController
  # def index; end

  ## ------------------------------------------------------------ ##

  # GET : /v1/explores/:id
  # Inherited from V1::BaseController
  # def show; end

  ## ------------------------------------------------------------ ##

  # POST : /v1/explores/:id/like
  def like
    like = resource.toggle_like!(current_user)
    data = { outfit: resource.as_api_response(show_template, template_injector) }
    message = like ? 'Liked Successfully' : 'Unliked Successfully'
    render_success(data: data, message: message)
  end

  ## ------------------------------------------------------------ ##

  private

  def template_injector
    {
      liked_outfit_ids: current_user.liked_outfit_ids
    }
  end

  def index_key
    :outfits
  end

  def show_key
    :outfit
  end

  def collection_order
    { created_at: :desc }
  end

  def show_template
    :explore
  end

  def index_template
    :explore
  end
end
