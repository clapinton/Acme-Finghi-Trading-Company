import ReactDOM from 'react-dom';
import React from 'react';
import SearchSpecies from './components/search/search';

document.addEventListener("DOMContentLoaded", () => {
  const mainEl = document.getElementById("react-container");

  ReactDOM.render(<SearchSpecies />, mainEl);
});