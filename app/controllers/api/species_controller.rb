class Api::SpeciesController < ApplicationController
  def index
    @all_species = Species.all
  end
end
