# frozen_string_literal: true

Rails.application.config.content_security_policy do |p|
  p.font_src    :self, :https, :data
  p.img_src     :self, :https, :data
  p.object_src  :none
  p.style_src   :self, :https, :unsafe_inline

  p.script_src :self, :https
  p.default_src :self, :https

  # Specify URI for violation reports
  # p.report_uri "/csp-violation-report-endpoint"

  # standard until this moment
  if Rails.env.development?
    p.script_src :self, :https, :unsafe_eval
    p.connect_src :self, :https, 'http://localhost:3035', 'ws://localhost:3035'
  end
end
