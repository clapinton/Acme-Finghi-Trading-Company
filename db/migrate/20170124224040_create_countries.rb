class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :country_name, null:false
      t.string :country_code2

      t.timestamps null: false
    end
  end
end
