class SearchController < ApplicationController

  def index
    tech_to_render = params["render"]
    if tech_to_render === 'jquery'
      render 'search/jquery'
    else
      render 'search/react'
    end
  end


end
