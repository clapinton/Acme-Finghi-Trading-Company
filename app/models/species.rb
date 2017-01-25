class Species < ActiveRecord::Base

  def self.searchSpecies(species_query, country_query = nil)
    Species.find_by_sql ["SELECT s.id, s.species_name, s.species_latin_name, c.country_name, i.next_shipment_date, i.inventory_count
      FROM species s
      LEFT OUTER JOIN species_inventories i ON s.id = i.species_id
      LEFT OUTER JOIN countries c ON c.id = i.country_id
      WHERE s.species_latin_name IN (?) AND c.country_code2 = ?;", species_query, country_query]
  end

end
