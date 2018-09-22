# frozen_string_literal: true

# == Schema Information
#
# Table name: brands
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_brands_on_LOWER_name  (lower((name)::text)) UNIQUE
#

class Brand < ApplicationRecord
  ## -------------------- Requirements -------------------- ##

  include BrandPresenter

  ## ----------------------- Scopes ----------------------- ##
  ## --------------------- Constants ---------------------- ##
  ## ----------------------- Enums ------------------------ ##
  ## -------------------- Associations -------------------- ##

  has_many :items, dependent: :destroy

  ## -------------------- Validations --------------------- ##

  validates :name, presence: true, uniqueness: { case_sensitive: false }

  ## --------------------- Callbacks ---------------------- ##
  ## ------------------- Class Methods -------------------- ##
  ## ---------------------- Methods ----------------------- ##
end
