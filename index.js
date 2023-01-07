/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
let eachItem = [];

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        eachItem[i] = games[i];   
    
        // create a new div element, which will become the game card

       let eachItems = document.createElement('div');  
        // add the class game-card to the list
        eachItems.classList.add("game-card");
        // set the inner HTML using a template literal to display some info 
        // const display = `
        // <div class = "game-img"  id="gameItem">
        // <img src ='${eachItem[i].img}' width=250 height=180</img>
        //       <h4>${eachItem[i].name}</h4>
        //       <h4>${eachItem[i].description}</h4>
        //       <h4>Backers: ${eachItem[i].backers}</h4>        
        // `;
        
        const display = `
        <div class = "game-img"  id="gameItem">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">   
                <img src ='${eachItem[i].img}' width=250 height=180</img>
                <h4>${eachItem[i].name}</h4>
                <h4>${eachItem[i].description}</h4>
                <h4>Backers: ${eachItem[i].backers}</h4>
            </div>
            <div class="flip-card-back">
                <h2> More about the game: </h2>
                <h4>Pledged: ${eachItem[i].pledged}</h4>
                <h4>Goal: ${eachItem[i].goal}</h4>
                <h4>Backers: ${eachItem[i].backers}</h4>
            </div>
          </div>
        </div>
      </div>`;
      eachItems.innerHTML  = display;
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
      gamesContainer.append(eachItems);
    }
}

// call the function we just defined using the correct variable
 
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalCont = GAMES_JSON.reduce( (acc, eachItem) => {
    return acc + eachItem.backers;
  }, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
let val = totalCont.toLocaleString('en-US');
contributionsCard.append(val);
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce( (acc, eachItem) => {
    return acc + eachItem.pledged;
  }, 0);
  let val1 = totalRaised.toLocaleString('en-US');
raisedCard.append('$'+val1)
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;
  gamesCard.append(totalGames);
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    let filterunfunded = GAMES_JSON.filter ( (eachItem) => {
        return eachItem.pledged < eachItem.goal;
      });
    // use the function we previously created to add the unfunded games to the DOM
      addGamesToPage(filterunfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let filterfunded = GAMES_JSON.filter ( (eachItem) => {
        return eachItem.pledged > eachItem.goal;
      });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(filterfunded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}


const searchG = document.getElementById("search-game");
const popup = document.getElementById("model-body");

function searchGame(results) {
    deleteChildElements(popup);
    let eachItems = document.createElement('div');
    var x = document.getElementById("input").value;
    if(x==''){
      var text = 'Please enter a game name!';
      popup.append(text);
    }
    else{
    var l = x.toLowerCase();
    let searchedGame = GAMES_JSON.filter ( (eachItem) => {
        return (eachItem.name).toLowerCase().indexOf(l) == 0;
      });
      for (let i = 0; i < searchedGame.length; i++) {
        eachItem[i] = searchedGame[i];   
        eachItems.classList.add("game-card");
        const display = `
        <div class = "game-img"  id="gameItem">
        <img src ='${eachItem[i].img}' width=250 height=180</img>
              <h4>${eachItem[i].name}</h4>
              <h4>${eachItem[i].description}</h4>
              <h4>Backers: ${eachItem[i].backers}</h4>        
        `;
        eachItems.innerHTML  = display;
        popup.append(eachItems);
}
if (results.length === 0 || searchedGame.length===0){
  const error = document.createElement('li')
  error.classList.add('error-message')
  const text = document.createTextNode('No results found!')
  popup.append(text);
}
    }
}
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener('click', searchGame);

const openModelButtons = document.querySelectorAll('[data-model-target]')
const closeModelButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModelButtons.forEach(button => {
  button.addEventListener('click', () => {
    const model = document.querySelector(button.dataset.modelTarget)
    openModel(model)
  })
})

overlay.addEventListener('click', () => {
  const models = document.querySelectorAll('.model.active')
  models.forEach(model => {
    closeModel(model)
  })
})

closeModelButtons.forEach(button => {
  button.addEventListener('click', () => {
    const model = button.closest('.model')
    closeModel(model)
  })
})

function openModel(model) {
  if (model == null) return
  model.classList.add('active')
  overlay.classList.add('active')
}

function closeModel(model) {
  if (model == null) return
  model.classList.remove('active')
  overlay.classList.remove('active')
}
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let countunfunded = GAMES_JSON.filter ( (eachItem) => {
    return eachItem.pledged < eachItem.goal;
  }).length;
// create a string that explains the number of unfunded games using the ternary operator

const displayStr = 'A total of $'+ val1 +' has been raised for '+totalGames +' games. Currently, ' + countunfunded +' games remain unfunded. We need your help to fund these amazing games!'
// create a new DOM element containing the template string and append it to the description container
const e = document.createElement('div');
e.innerHTML= displayStr;
descriptionContainer.append(e);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */


const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

let [first, second, ...rest] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstName = `
    ${first.name}
`
firstGameContainer.append(firstName);


// do the same for the runner up item

const secondName = `
    ${second.name}
`
secondGameContainer.append(secondName);
