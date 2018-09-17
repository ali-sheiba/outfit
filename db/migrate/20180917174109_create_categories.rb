class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string  :name,          null: false
      t.integer :category_type, null: false
      t.timestamps
      t.index 'LOWER(name)', unique: true
    end
  end
end
