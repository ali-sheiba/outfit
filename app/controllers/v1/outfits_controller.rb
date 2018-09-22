# frozen_string_literal: true

class V1::OutfitsController < V1::BaseController
  power :outfits, as: :outfits_scope

  ## ------------------------------------------------------------ ##

  # GET : /v1/outfits/
  # Inherited from V1::BaseController
  # def index; end

  ## ------------------------------------------------------------ ##

  # POST : /v1/outfits/
  # Inherited from V1::BaseController
  def create
    super do |data, resource|
      resource.items = current_user.items.where(id: outfit_items_params['item_ids'])
      data[show_key] = resource.as_api_response(show_template, template_injector)
    end
  end

  ## ------------------------------------------------------------ ##

  # GET : /v1/outfits/:id
  # Inherited from V1::BaseController
  # def show; end

  ## ------------------------------------------------------------ ##

  # PUT : /v1/outfits/:id
  # Inherited from V1::BaseController
  # def update; end

  ## ------------------------------------------------------------ ##

  # DELETE : /v1/outfits/:id
  # Inherited from V1::BaseController
  # def destroy; end

  ## ------------------------------------------------------------ ##

  private

  # Whitelist parameters
  def outfit_params
    params.require(:outfit)
          .permit(action_name == 'create' ? [:name] : [:name, item_ids: []])
  end

  def outfit_items_params
    params.require(:outfit)
          .permit(item_ids: [])
  end
end
