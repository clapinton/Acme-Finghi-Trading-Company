class Api::CountriesController < ApplicationController

  def index
    @all_countries = Country.all
  end
end
