import ReactDOM from 'react';
import React from 'react';
import SearchSpecies from './components/search';

document.addEventListener("DOMContentLoaded", () => {
  const mainEl = document.getElementById("react-container");

  ReactDOM.render(<SearchSpecies />, mainEl);
});