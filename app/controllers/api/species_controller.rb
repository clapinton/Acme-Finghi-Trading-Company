class Api::SpeciesController < ApplicationController
  def index
    @all_species = Species.order(:species_name)
  end
end
