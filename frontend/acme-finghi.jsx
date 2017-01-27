import ReactDOM from 'react-dom';
import React from 'react';
import SearchSpecies from './components/search/search';

document.addEventListener("DOMContentLoaded", () => {
  console.log("This interface was built with React and JS ES6. Add ?render=jquery to the URL for the jQuery version.")
  const mainEl = document.getElementById("react-container");

  ReactDOM.render(<SearchSpecies />, mainEl);
});