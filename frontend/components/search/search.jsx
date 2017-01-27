// This component displays the results from the ajax request.
// The response from the request was stored in a store,
// which is then passed in as a prop to this component.
// This code was written in JS ES6

import React from 'react';
import SpeciesResults from '../results/results';
import { keys } from 'lodash';
// Lodash library is used for its object methods, specifically extracting the keys from the object.

class SearchSpecies extends React.Component {

  constructor() { //Deconstructing the props object, assuming it only contains species
    super();
    this.state = {
      allSpecies: [],
      allCountries: [],
      selectedSpecies: new Set(),
      country: '-',
      matchingSpecies: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
  }

  componentWillMount() {
    this.getAllSpecies();
    this.getAllCountries();
  }

  getAllSpecies() {
    const receiveAllSpecies = res => {this.setState({allSpecies: res})};
    $.ajax({
      method: "GET",
      url: 'api/species',
      success: receiveAllSpecies,
      error: function(res) {alert("An error has occurred: " + res.status + " - " + res.statusText)}
    });
  }

  getAllCountries() {
    const receiveAllCountries = res => {this.setState({allCountries: res})};
    $.ajax({
      method: "GET",
      url: 'api/countries',
      success: receiveAllCountries,
      error: function(res) {alert("An error has occurred: " + res.status + " - " + res.statusText)}
    });
  }  

  toggleCheckbox(el) {
    const id = el.target.value;
    if (this.state.selectedSpecies.has(id)) {
      this.state.selectedSpecies.delete(id)
    } else {
      this.state.selectedSpecies.add(id);
    }
  }

  updateCountry() {
    return event => {
      this.setState({country: event.target.value});
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // Grabs all species selected and joins their indices in a string
    let speciesQuery = "";
    // for (let id of this.state.selectedSpecies) {speciesQuery += "id,"};
    // const speciesQuery = keys(this.state.selectedSpecies.map( id => {
    //   if (this.state.selectedSpecies[id] === true ) return id
    // })).join(",");
    this.state.selectedSpecies.forEach( id => speciesQuery+= `${id},`);

    const queryUrl = `api/search?species=${speciesQuery}&country=${this.state.country}`;

    const receiveMatchedSpecies = res => {this.setState({matchingSpecies: res})};

    $.ajax({
      method: "GET",
      url: queryUrl,
      success: receiveMatchedSpecies,
      error: (res) => {alert(`An error has occurred: ${res.status} - ${res.statusText}`)}
    });
  }

  render() {
    // Looking back, I'd prefer to have split the checkboxes and dropdown to make a more modular form.
    return(
      <div>
        <h1>React</h1>
        <main>
          <form className="search-form">
            <h2>Select one or more species:</h2>
            <div className="species-selector">
              {keys(this.state.allSpecies).map( name => (
                <label key={this.state.allSpecies[name].id}>
                  <input type='checkbox' name='species-list-item' value={this.state.allSpecies[name].id} onChange={this.toggleCheckbox}/>
                  {name} ({this.state.allSpecies[name].latin_name})
                  <br/>
                </label>
              ))}
            </div>
            <h2>From which country (optional):</h2>
            <select value={this.state.country} id="country-selector" onChange={this.updateCountry()}>
              <option value="-">-</option>
              {keys(this.state.allCountries).map( name => (
                <option value={this.state.allCountries[name].code} key={this.state.allCountries[name].code}>{name}</option>
              ))}
            </select>
            <br/>
            <button onClick={this.handleSubmit}>Search</button>
          </form>

          <SpeciesResults species = {this.state.matchingSpecies}/>
        </main>
      </div>
    )
  }
}

export default SearchSpecies;