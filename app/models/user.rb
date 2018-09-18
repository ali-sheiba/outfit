# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  date_of_birth          :date             not null
#  email                  :string           not null
#  encrypted_password     :string           not null
#  first_name             :string           not null
#  last_name              :string           not null
#  mobile                 :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

class User < ApplicationRecord
  ## -------------------- Requirements -------------------- ##

  include Devise::JWT::RevocationStrategies::Whitelist

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  ## ----------------------- Scopes ----------------------- ##
  ## --------------------- Constants ---------------------- ##
  ## ----------------------- Enums ------------------------ ##
  ## -------------------- Associations -------------------- ##

  has_many :items, dependent: :destroy

  ## -------------------- Validations --------------------- ##

  validates :first_name,    presence: true
  validates :last_name,     presence: true
  validates :mobile,        presence: true
  validates :date_of_birth, presence: true

  ## --------------------- Callbacks ---------------------- ##
  ## ------------------- Class Methods -------------------- ##
  ## ---------------------- Methods ----------------------- ##

  def full_name
    [first_name, last_name].join(' ')
  end

  def jwt_payload
    {
      name: full_name,
      email: email
    }
  end
end
