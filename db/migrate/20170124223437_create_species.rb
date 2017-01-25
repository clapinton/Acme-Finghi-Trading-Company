class CreateSpecies < ActiveRecord::Migration
  def change
    create_table :species do |t|
      t.string :species_name
      t.string :species_latin_name, null:false

      t.timestamps null: false
    end
    add_index :species, :species_latin_name, unique: true
  end
end
