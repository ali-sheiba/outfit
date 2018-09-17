class CreateBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :brands do |t|
      t.string :name, null: false
      t.timestamps
      t.index 'LOWER(name)', unique: true
    end
  end
end
