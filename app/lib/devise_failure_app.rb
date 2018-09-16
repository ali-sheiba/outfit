# frozen_string_literal: true

class DeviseFailureApp < Devise::FailureApp
  def http_auth_body
    return super unless request_format == :json

    {
      error_code: 1104,
      error: i18n_message,
      data: {}
    }.to_json
  end
end
