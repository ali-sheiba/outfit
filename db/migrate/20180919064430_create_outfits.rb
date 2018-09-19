class CreateOutfits < ActiveRecord::Migration[5.2]
  def change
    create_table :outfits do |t|
      t.references :user, foreign_key: { on_delete: :cascade }, null: false
      t.string     :name, null: false

      t.timestamps

      t.index :name
    end
  end
end
