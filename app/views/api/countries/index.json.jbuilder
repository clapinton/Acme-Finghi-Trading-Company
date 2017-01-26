@all_countries.each do |country|
  json.set! country.country_name do
    json.id country.id
    json.code country.country_code2
  end
end