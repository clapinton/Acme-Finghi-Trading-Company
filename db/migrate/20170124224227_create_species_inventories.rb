class CreateSpeciesInventories < ActiveRecord::Migration
  def change
    create_table :species_inventories do |t|
      t.integer :species_id, null:false
      t.integer :country_id, null:false
      t.integer :inventory_count, null:false
      t.date :next_shipment_date
      t.float :price, null:false

      t.timestamps null: false
    end
  end
end
