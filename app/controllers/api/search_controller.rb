class Api::SearchController < ApplicationController

  def index
    species_query = params["species"].split(",") #Returns an array of species latin names
    country_query = params["country"] === "-" ? nil : params["country"]


    @matched_species = Species.searchSpecies(species_query, country_query) #Will be passed to the search View for rendering
  end
  
end
