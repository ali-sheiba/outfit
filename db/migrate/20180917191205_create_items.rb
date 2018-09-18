class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.references :user,     foreign_key: { on_delete: :cascade }, null: false
      t.references :category, foreign_key: { on_delete: :cascade }, null: false
      t.references :brand,    foreign_key: { on_delete: :cascade }, null: false
      t.references :color,    foreign_key: { on_delete: :cascade }, null: false
      t.string     :name,     null: false
      t.decimal    :price,    precision: 5, scale: 2, null: false

      t.timestamps
    end
  end
end
