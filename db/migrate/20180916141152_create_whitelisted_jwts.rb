class CreateWhitelistedJwts < ActiveRecord::Migration[5.2]
  def change
    create_table :whitelisted_jwts do |t|
      t.references :user, foreign_key: { on_delete: :cascade }, null: false
      t.string :jti, null: false
      t.string :aud
      t.datetime :exp, null: false
      t.index :jti, unique: true

      t.timestamps
    end
  end
end
