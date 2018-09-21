# frozen_string_literal: true

class V1::ItemsController < V1::BaseController
  power :items, as: :items_scope

  ## ------------------------------------------------------------ ##

  # GET : /v1/items/
  # Inherited from V1::BaseController
  # def index; end

  ## ------------------------------------------------------------ ##

  # POST : /v1/items/
  # Inherited from V1::BaseController
  # def create; end

  ## ------------------------------------------------------------ ##

  # GET : /v1/items/:id
  # Inherited from V1::BaseController
  # def show; end

  ## ------------------------------------------------------------ ##

  # PUT : /v1/items/:id
  # Inherited from V1::BaseController
  # def update; end

  ## ------------------------------------------------------------ ##

  # DELETE : /v1/items/:id
  # Inherited from V1::BaseController
  # def destroy; end

  ## ------------------------------------------------------------ ##

  # GET : /v1/items/options
  def options
    data = {
      brands: Brand.order(name: :asc).as_api_response(:options),
      colors: Color.order(name: :asc).as_api_response(:options),
      categories: Category.order(name: :asc).as_api_response(:options)
    }

    render_success(data: data)
  end

  ## ------------------------------------------------------------ ##

  private

  # Whitelist parameters
  def item_params
    params.require(:item)
          .permit(
            :name,
            :price,
            :brand_id,
            :category_id,
            :color_id
          )
  end

  # Search filters
  # def search_params; end

  # Custom ordering and sorting
  # def get_order; end
end
