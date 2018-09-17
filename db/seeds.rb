# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

brands = YAML.load_file('db/brands.yml')
brands.each { |name| Brand.create(name: name) }

Category.create([
  { name: 'Shoes',                 category_type: :shoes },
  { name: 'Sneakers',              category_type: :shoes },
  { name: 'Sports shoes',          category_type: :shoes },
  { name: 'Slip Ons',              category_type: :shoes },
  { name: 'Lace Ups',              category_type: :shoes },
  { name: 'Sandals',               category_type: :shoes },
  { name: 'Flip flops',            category_type: :shoes },
  { name: 'Boots',                 category_type: :shoes },
  { name: 'Hoodies & sweatshirts', category_type: :clothing },
  { name: 'Cardigans & sweaters',  category_type: :clothing },
  { name: 'Jackets & coats',       category_type: :clothing },
  { name: 'T-shirts & vests',      category_type: :clothing },
  { name: 'Underwear & socks',     category_type: :clothing },
  { name: 'Sportswear',            category_type: :clothing },
  { name: 'Shirts',                category_type: :clothing },
  { name: 'Suits',                 category_type: :clothing },
  { name: 'Shorts',                category_type: :clothing },
  { name: 'Pants & chinos',        category_type: :clothing },
  { name: 'Jeans',                 category_type: :clothing },
  { name: 'Swimwear',              category_type: :clothing },
])

Color.create([
  { name: 'Beige' },
  { name: 'Black' },
  { name: 'Blue' },
  { name: 'Browns' },
  { name: 'Burgundy' },
  { name: 'Checks' },
  { name: 'Green' },
  { name: 'Grey' },
  { name: 'Khaki' },
  { name: 'Monochrome' },
  { name: 'Multicolor' },
  { name: 'Navy' },
  { name: 'Neutrals' },
  { name: 'Orange' },
  { name: 'Pink' },
  { name: 'Prints' },
  { name: 'Purple' },
  { name: 'Red' },
  { name: 'Stripes' },
  { name: 'White' },
  { name: 'Yellow' },
])
