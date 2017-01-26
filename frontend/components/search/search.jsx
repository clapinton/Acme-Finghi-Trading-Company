// This component displays the results from the ajax request.
// The response from the request was stored in a store,
// which is then passed in as a prop to this component.
// This code was written in JS ES6

import React from 'react';
import SpeciesResults from '../results/results';
// Lodash library is used for its object methods, specifically extracting the keys from the object.

class SearchSpecies extends React.Component {

  constructor() { //Deconstructing the props object, assuming it only contains species
    super();
    this.state = {
      speciesQuery: 'Error dolorem,Sint omnis',
      country: 'BV',
      matchingSpecies: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSpeciesQuery = this.updateSpeciesQuery.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
  }

  updateSpeciesQuery() {
    return event => {
      this.setState({speciesQuery: event.target.value});
    }
  }

  updateCountry() {
    return event => {
      this.setState({country: event.target.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const queryUrl = `api/search?species=${this.state.speciesQuery}&country=${this.state.country}`;

    const receiveMatchedSpecies = res => {this.setState({matchingSpecies: res})};

    $.ajax({
      method: "GET",
      url: queryUrl,
      success: receiveMatchedSpecies,
      error: (res) => {alert(`An error has occurred: ${res.status} - ${res.statusText}`)}
    });
  }

  render() {
    const codes=['BV', 'BR',	'VG',	'IO',	'BN',	'BG',	'BF',	'BI',	'KH',	'CM',	'CA',	'CV',	'KY',	'CF',	'TD',	'CL',	'CN',	'HK', 'MO',	'CX',	'CC',	'CO',	'KM',	'CG',	'CD',	'CK',	'CR',	'CI',	'HR',	'CU',	'CY',	'CZ',	'DK',	'DJ',	'DM',	'DO'];
    return(
      <div>
        <h1>jQuery</h1>
        <form className="search-form">
          <input id="species-input" value={this.state.speciesQuery} onChange={this.updateSpeciesQuery()}/>
          <select value={this.state.country} id="country-selector" onChange={this.updateCountry()}>
            {codes.map( code => (
              <option value={code} key={code}>{code}</option>
            ))}
          </select>
          <br/>
          <button onClick={this.handleSubmit}>Search</button>
        </form>

        <SpeciesResults species = {this.state.matchingSpecies}/>
      </div>
    )
  }
}

export default SearchSpecies;