// This component displays the results from the ajax request.
// The response from the request was stored in a store,
// which is then passed in as a prop to this component.
// This code was written in JS ES6

import React from 'react';
// Lodash library is used for its object methods, specifically extracting the keys from the object.
import { keys } from 'lodash';

class SearchSpecies extends React.Component {

  constructor({ species }) { //Deconstructing the props object, assuming it only contains species
    super(species); //Executes React.Component's constructor method, if any, with the passed in props.

    this.displayedShipmentDate = this.displayedShipmentDate.bind(this);
  }

  displayedShipmentDate(inventory, shipmentDate) {
    const dateNow = new Date(); //This is today in milliseconds since Jan 1, 1970 
    const dateOfNextShipment = Date.parse(shipmentDate); //Milliseconds between date and Jan 1, 1970

    // Only displays the next shipment if the date is in the future and the inventory is 0.
    if (inventory === 0 && dateOfNextShipment > dateNow) {
      return shipmentDate;
    } else {
      return "-";
    }
  }

  render() {
    return(
      <div>
        <ul class="species-list-headers">
          <li>ID</li>
          <li>Name</li>
          <li>Latin Name</li>
          <li>Country of Origin</li>
          <li>Next Shipment Date</li>
        </ul>
        
        <ul class="species-list">

          {keys(species).map( speciesId => (
            <li class="species-list" key={speciesId}>
            
              <div class="speciesInfo">{speciesId}</div>
              <div class="speciesInfo">{species[speciesId].name}</div>
              <div class="speciesInfo">{species[speciesId].latin_name}</div>
              <div class="speciesInfo">{species[speciesId].country_name}</div>
              <div class="speciesInfo">
                {this.displayedShipmentDate(species[speciesId].inventory_count, species[speciesId].next_shipment_date)}
              </div>
              
            </li>
          ))}

        </ul>
      </div>
    )
  }
}

export default SearchSpecies;