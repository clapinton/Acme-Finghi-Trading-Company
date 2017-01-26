class Species < ActiveRecord::Base

  def self.searchSpecies(species_query, country_query = nil)
    # If the country_code2 is not supplied, it should return all results
    if country_query
      Species.find_by_sql ["SELECT s.id, s.species_name, s.species_latin_name, c.country_name, i.id inventory_id , i.next_shipment_date, i.inventory_count
        FROM species s
        LEFT OUTER JOIN species_inventories i ON s.id = i.species_id
        LEFT OUTER JOIN countries c ON c.id = i.country_id
        WHERE s.id IN (?) AND c.country_code2 = ?;", species_query, country_query]
    else 
      Species.find_by_sql ["SELECT s.id, s.species_name, s.species_latin_name, c.country_name, i.id inventory_id, i.next_shipment_date, i.inventory_count
        FROM species s
        LEFT OUTER JOIN species_inventories i ON s.id = i.species_id
        LEFT OUTER JOIN countries c ON c.id = i.country_id
        WHERE s.id IN (?);", species_query]
    end      
  end

end
