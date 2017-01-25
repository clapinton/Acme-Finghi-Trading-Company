num_species = 30
num_countries = 20

species = {}
latin_names = []

for i in (1..num_species) do
  name = Faker::Beer.name
  latin_name = Faker::Lorem.words(2).join(" ").capitalize
  while latin_names.index(latin_name)
    latin_name = Faker::Lorem.words(2).join(" ").capitalize
  end
  latin_names.push(latin_name)
  species[i] = Species.create!(species_name: name, species_latin_name: latin_name)
end

countries = {}
country_codes = []
names = ['Bouvet Island', 'Brazil', 'British Virgin Islands', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Hong Kong',
'Macao', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo (Brazzaville)', 'Democratic Republic of the Congo', 'Cook Islands', 'Costa Rica', 'Côte dIvoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic']
codes=['BV',	'BR',	'VG',	'IO',	'BN',	'BG',		'BF',	'BI',	'KH',	'CM',	'CA',	'CV',	'KY',	'CF',	'TD',	'CL',	'CN',	'HK', 'MO',	'CX',	'CC',	'CO',	'KM',	'CG',	'CD',	'CK',	'CR',	'CI',	'HR',	'CU',	'CY',	'CZ',	'DK',	'DJ',	'DM',	'DO']
names.each_with_index do |name, idx|
  countries[idx+1] = Country.create!(country_name: name, country_code2: codes[idx])
end

inventory = {}
i=1
species.keys.each do |species_id|
  countries.keys.each do |country_id|
    count = Faker::Number.number(2).to_i * rand.round #rand.round will be either 0 or 1, so it will generate empty inventories
    ship_date = Faker::Date.between(1.week.ago, 1.week.from_now)
    price = Faker::Number.decimal(2)

    inventory[i] = SpeciesInventory.create!(species_id: species_id, country_id: country_id, inventory_count: count, next_shipment_date: ship_date, price: price)
    i+=1
  end
end
