@all_species.each do |species|
  json.set! species.species_name do
    json.id species.id
    json.latin_name species.species_latin_name
  end
end