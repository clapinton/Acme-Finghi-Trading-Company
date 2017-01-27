// This component displays the results from the ajax request.
// The response from the request was passed in as a prop to this component.
// This code was written in JS ES6

import React from 'react';
// Lodash library is used for its object methods, specifically extracting the keys from the object.
import { keys } from 'lodash';

class SpeciesResults extends React.Component {

  constructor(props) { //Deconstructing the props object, assuming it only contains species
    super(props); //Executes React.Component's constructor method, if any, with the passed in props.

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
    let species = this.props.species;
    return(
      <div className="species-table-wrapper">
        <table className="species-list-table">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Latin Name</th>
            <th>Country of Origin</th>
            <th>Next Shipment Date</th>
          </tr>
        
          {keys(species).map( inventoryId => (
            <tr className="species-list" key={inventoryId}>
            
              <td className="speciesInfo">{species[inventoryId].id}</td>
              <td className="speciesInfo">{species[inventoryId].name}</td>
              <td className="speciesInfo">{species[inventoryId].latin_name}</td>
              <td className="speciesInfo">{species[inventoryId].country_name}</td>
              <td className="speciesInfo">
                {this.displayedShipmentDate(species[inventoryId].inventory_count, species[inventoryId].next_shipment_date)}
              </td>
              
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SpeciesResults;
