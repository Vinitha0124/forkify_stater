import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//we will create a async function so that we can make a single await

const controlRecipes = async function () {
  try {
    recipeView.renderSpinner();
    const id = window.location.hash.slice(1);
    if (!id) return;

    // recipeView.renderSpinner();

    //load recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //rendering recipe
    recipeView.render(model.state.recipe);
    controlServings();
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
  // controlServings();
};
// controlRecipes();

const controlSearchResults = async function () {
  try {
    //load the spinner
    resultsView.renderSpinner();

    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    //load search results
    await model.loadSearchResults(query);

    // render results
    // console.log(model.state.search.results);

    //view only 10 per page
    resultsView.render(model.getSearchResultsPage());

    //view all results
    // resultsView.render(model.state.search.results);

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {

  console.log(goToPage);

  //render new results

  resultsView.render(model.getSearchResultsPage(goToPage));

 

  //render new pagination buttons

  paginationView.render(model.state.search);

};

const controlServings = function(newServings){
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
}

// controlSearchResults('pizza');

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);


};
init();