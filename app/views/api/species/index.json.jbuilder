@all_species.each do |species|
  json.set! species.id do
    json.latin_name species.species_latin_name
    json.name species.species_name
  end
end