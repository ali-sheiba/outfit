class CreateOutfitLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :outfit_likes do |t|
      t.references :user,   foreign_key: { on_delete: :cascade }, null: false
      t.references :outfit, foreign_key: { on_delete: :cascade }, null: false
      t.timestamps
      t.index %i[user_id outfit_id], unique: true
    end
    add_column :outfits, :likes_counter, :integer, null: false, default: 0
    add_column :outfits, :total_price, :decimal, precision: 5, scale: 2, null: false, default: 0
  end
end
