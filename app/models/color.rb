# frozen_string_literal: true

# == Schema Information
#
# Table name: colors
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_colors_on_LOWER_name  (lower((name)::text)) UNIQUE
#

class Color < ApplicationRecord
  ## -------------------- Requirements -------------------- ##
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
