# frozen_string_literal: true

# == Schema Information
#
# Table name: items
#
#  id          :bigint(8)        not null, primary key
#  name        :string           not null
#  price       :decimal(6, 2)    not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  brand_id    :bigint(8)        not null
#  category_id :bigint(8)        not null
#  color_id    :bigint(8)        not null
#  user_id     :bigint(8)        not null
#
# Indexes
#
#  index_items_on_brand_id     (brand_id)
#  index_items_on_category_id  (category_id)
#  index_items_on_color_id     (color_id)
#  index_items_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (brand_id => brands.id) ON DELETE => cascade
#  fk_rails_...  (category_id => categories.id) ON DELETE => cascade
#  fk_rails_...  (color_id => colors.id) ON DELETE => cascade
#  fk_rails_...  (user_id => users.id) ON DELETE => cascade
#

class Item < ApplicationRecord
  ## -------------------- Requirements -------------------- ##

  include ItemPresenter
  has_one_attached :image

  attr_accessor :image_contents, :image_name

  ## ----------------------- Scopes ----------------------- ##

  default_scope { with_attached_image }

  scope :with_associations, -> { includes(:color, :brand, :category) }

  ## --------------------- Constants ---------------------- ##
  ## ----------------------- Enums ------------------------ ##
  ## -------------------- Associations -------------------- ##

  belongs_to :user
  belongs_to :color
  belongs_to :category
  belongs_to :brand

  has_many :outfit_items, dependent: :destroy
  has_many :outfits,      through: :outfit_items, source: :outfit

  ## -------------------- Validations --------------------- ##

  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than: 0.0 }

  validate :image_validations, on: :create

  ## --------------------- Callbacks ---------------------- ##

  after_create :parse_image

  ## ------------------- Class Methods -------------------- ##
  ## ---------------------- Methods ----------------------- ##

  def image_validations
    errors.add(:base, I18n.t('errors.image_file_required')) if image_contents.nil?
  end

  def parse_image
    return if image_contents.nil? || image_contents[%r/(image\/[a-z]{3,4})|(application\/[a-z]{3,4})/] == ''

    content_type = image_contents[%r/(image\/[a-z]{3,4})|(application\/[a-z]{3,4})/]
    content_type = content_type[%r{\b(?!.*\/).*}]
    contents = image_contents.sub(%r/data:((image|application)\/.{3,}),/, '')
    decoded_data = Base64.decode64(contents)
    filename = image_name || 'image_' + Time.zone.now.to_s + '.' + content_type
    FileUtils.mkdir_p("#{Rails.root}/tmp/images")
    File.open("#{Rails.root}/tmp/images/#{filename}", 'wb') do |f|
      f.write(decoded_data)
    end
    image.attach(io: File.open("#{Rails.root}/tmp/images/#{filename}"), filename: filename)
    FileUtils.rm("#{Rails.root}/tmp/images/#{filename}")
  end

  def image_url
    return unless image.attached?

    image.service_url
  end
end
