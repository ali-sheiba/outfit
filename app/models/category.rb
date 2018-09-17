# frozen_string_literal: true

# == Schema Information
#
# Table name: categories
#
#  id            :bigint(8)        not null, primary key
#  category_type :integer          not null
#  name          :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_categories_on_LOWER_name  (lower((name)::text)) UNIQUE
#

class Category < ApplicationRecord
  ## -------------------- Requirements -------------------- ##

  extend Enumerize

  ## ----------------------- Scopes ----------------------- ##
  ## --------------------- Constants ---------------------- ##
  ## ----------------------- Enums ------------------------ ##

  enumerize :category_type, in: {
    shoes:    1,
    clothing: 2
  }

  ## -------------------- Associations -------------------- ##
  ## -------------------- Validations --------------------- ##

  validates :name, presence: true, uniqueness: { case_sensitive: false }

  ## --------------------- Callbacks ---------------------- ##
  ## ------------------- Class Methods -------------------- ##
  ## ---------------------- Methods ----------------------- ##
end
