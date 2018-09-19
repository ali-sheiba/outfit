class CreateOutfitItems < ActiveRecord::Migration[5.2]
  def change
    create_table :outfit_items do |t|
      t.references :item,   foreign_key: { on_delete: :cascade }, null: false
      t.references :outfit, foreign_key: { on_delete: :cascade }, null: false

      t.timestamps

      t.index %i[item_id outfit_id], unique: true
    end
  end
end
