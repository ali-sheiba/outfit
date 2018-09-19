# frozen_string_literal: true

class V1::ProfilesController < V1::BaseController
  power :profile, as: :profiles_scope

  ## ------------------------------------------------------------ ##

  # GET : /v1/me
  # Inherited from V1::BaseController
  # def show; end

  ## ------------------------------------------------------------ ##

  # PUT : /v1/me
  # Inherited from V1::BaseController
  # def update; end

  ## ------------------------------------------------------------ ##

  private

  def find_resource
    super(scope)
  end

  def show_key
    :user
  end

  # Whitelist parameters
  def me_params
    params.require(:user)
          .permit(
            :first_name,
            :last_name,
            :email,
            :mobile,
            :date_of_birth,
            :password,
            :password_confirmation
          )
  end
end
