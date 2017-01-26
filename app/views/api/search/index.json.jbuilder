@matched_species.each do |species|
  json.set! species.inventory_id do
    json.id species.id
    json.latin_name species.species_latin_name
    json.name species.species_name
    json.country_name species.country_name
    json.next_shipment_date species.next_shipment_date
    json.inventory_count species.inventory_count
  end
end