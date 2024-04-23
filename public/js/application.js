let topElement = document.getElementById('topmatter');
let bottomElement = document.getElementById('bottommatter');
let characters = getAll();
let ratings = getRatings()

function getRatings(){
  var xhttp = new XMLHttpRequest();
  let username = sessionStorage.getItem("username")
  let data = '';
  xhttp.open('GET', `http://localhost:3050/api/currentRatings/${username}`, false);
  xhttp.setRequestHeader('Accept', 'application/json');
  xhttp.send();
  if (xhttp.status == 200) {
    data = JSON.parse(xhttp.responseText);
  } else {
    alert("There is something wrong.  Please try again later.");
  }
  return data;

}

function getAll() {
  var xhttp = new XMLHttpRequest();
  let data = '';
  xhttp.open('GET', 'http://localhost:3050/api/character/', false);
  xhttp.setRequestHeader('Accept', 'application/json');
  xhttp.send();
  if (xhttp.status == 200) {
    data = JSON.parse(xhttp.responseText);
  } else {
    alert("There is something wrong.  Please try again later.");
  }
  return data;
}
// Iterate through each character and create a clickable link in the 'topmatter' element
//console.log(getAll());
//showAllMovies();
// characters.forEach(element => {
//   let linkNode = document.createElement('div');
//   //linkNode.innerText = element;
//   linkNode.setAttribute('onclick', `populateChar(${element.id})`);
//   topElement.appendChild(linkNode);
//   // Create and append character cards side by side
//   createCharacterCard(element);
// });

function showAllMovies(){
  let displayDiv = document.getElementById("characterCardsContainer");

  displayDiv.innerHTML = "";
  characters.forEach(element => {
    let linkNode = document.createElement('div');
    //linkNode.innerText = element;
    linkNode.setAttribute('onclick', `populateChar(${element.movie_id})`);
    topElement.appendChild(linkNode);
    // Create and append character cards side by side
    createCharacterCard(element);
  });
}

function showRecommended(pageNumber){
  var xhttp = new XMLHttpRequest();
  let username = sessionStorage.getItem("username")
  let recommendations;
  xhttp.open('GET', `http://localhost:3050/api/userRating/${username}`, false);
  xhttp.setRequestHeader('Accept', 'application/json');
  xhttp.send();
  if (xhttp.status == 200) {
    recommendations = JSON.parse(xhttp.responseText);
  } else {
    alert("There is something wrong.  Please try again later.");
  }
  //console.log(recommendations);
  //recommendations = [[9,3],[2,4],[5,5], [6,2], [7,1]]
  let displayRec = recommendations.filter(e => (e[1] >= 3))
  displayRec.sort((a,b) => (b[1] - a[1]))

  const startIndex = (pageNumber - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  let displayDiv = document.getElementById("characterCardsContainer");

  displayDiv.dataset.display = "recommended"
  displayDiv.dataset.movieCount = displayRec.length
  displayDiv.innerHTML = "";

  displayRec = displayRec.slice(startIndex, endIndex);

  displayRec.forEach(e => {
    let movie = characters.find(x => x.movie_id == e[0])
    let linkNode = document.createElement('div');
    //linkNode.innerText = element;
    linkNode.setAttribute('onclick', `populateChar(${movie.movie_id})`);
    topElement.appendChild(linkNode);
    // Create and append character cards side by side
    createCharacterCard(movie);
  });

  displayRecTitle()


}

function getOne(id) {
  let xhttp = new XMLHttpRequest();
  let charData = '';
  xhttp.open('GET', `http://localhost:3050/api/character/${id}`, false);
  xhttp.setRequestHeader('Accept', 'application/json');
  xhttp.send();
  if (xhttp.status == 200) {
    charData = JSON.parse(xhttp.responseText);
  } else {
    alert("There is something wrong.  Please try again later.");
  }
  return charData;
}
function populateChar(id) {
  bottomElement.replaceChildren();
  let currentChar = getOne(id);

  // Image
  let picNode = document.createElement('img');
  picNode.setAttribute('src', `img/${currentChar.image}`); // Correct the path
  picNode.setAttribute('alt', currentChar.name);
  picNode.style.maxWidth = '400px';
  picNode.style.maxHeight = '400px';
  picNode.style.marginRight = '400px'; // Adjust the left margi
  // Head
  let titleNode = document.createElement('h1');
  titleNode.innerText = currentChar.name;
  // Description
  let descNode = document.createElement('p');
  descNode.innerText = currentChar.desc; // Check that the property name is correct

}





/**
 * 
 * @param 
 * 
 * Ikaia Melton
 * CSCI 5436 Distrubted Web System Design 
 * 11/12/2023
 * 
 *
 * Consistent CSS, Cards, and Content Page (50 points)
  One team member is expected to complete this.
  The CSS and UI/UX must have a consistent modern feel across the site.  
  Each character will have a card with the thumbnail image and the character name.  (Each character card may include more.  This is the minimal content to include).
  When the character card is clicked, the content for the character will be shown in another page, in a modal, in a content section, or some other means.
  The character content will include the character name, description, and full size image.
  This team member will collaborate with other team members to come up with the CSS and controls for the Filters and the Favorites; however, it is not this team members responsibility to implement the CSS and controls for the Filters and Favorites.
 * 
 * } 
 */

//Function to create and display the character card
function createCharacterCard(element) {
  let characterCardsContainer = document.getElementById('characterCardsContainer');
  let characterCard = document.createElement('div');
  characterCard.className = 'col mb-3'; //Added margin-bottom to create space between cards
  characterCard.onclick = () => showLargerCard(element);//Click event to open the modal with larger card content


  // Click event to open the modal with larger card content
  characterCard.onclick = () => showLargerCard(element);

  // Each character card includes the character name, description, and full-size image
  let cardContentScript = `
            <div class="card h-100 shadow">
                <div class="card-body">
                    <h5 class="card-title text-center">${element.title}</h5> <!-- Centered title -->
                    <p class="card-text">${element.genre}</p>
                    <span class="heart-icon">&#10084;</span> <!-- Added empty heart icon added an id-->
                </div>
            </div>
        `;
  characterCard.innerHTML = cardContentScript;
  characterCardsContainer.appendChild(characterCard);

  // Add hover effect using JavaScript
  characterCard.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.3)';
    this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  });

  characterCard.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'none';
  });
}
//Function to show the larger card content in the modal
function showLargerCard(element) {
  let modal = new bootstrap.Modal(document.getElementById('cardModal'));
  let modalBody = document.querySelector('.modal-body');

  let movieRating
  if(ratings){
    movieRating = ratings.find(e => e.movie_id == element.movie_id)
    if(movieRating){
      movieRating = movieRating.rating
    }
  }

  //Each character card include the character name, description, full size image and a closing button
  let largerCardContentScript = `
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button> 
        <class="img-fluid" alt="${element.title}">
        <h2>${element.title}</h2>
        <p>${element.genre}</p>
        <div class="rating" id="ratingDiv" data-id="${element.movie_id}">
        <input type="radio" id="star5" name="rating" value="5" ${movieRating == 5 ? "checked" : ""}>
        <span onclick="setRating()"><label for="star5">☆</label></span>
        <input type="radio" id="star4" name="rating" value="4" ${movieRating == 4 ? "checked" : ""}>
  <span onclick="setRating()"><label for="star4">☆</label></span>
  <input type="radio" id="star3" name="rating" value="3" ${movieRating == 3 ? "checked" : ""}>
  <span onclick="setRating()"><label for="star3">☆</label></span>
  <input type="radio" id="star2" name="rating" value="2" ${movieRating == 2 ? "checked" : ""}>
  <span onclick="setRating()"><label for="star2">☆</label></span>
  <input type="radio" id="star1" name="rating" value="1" ${movieRating == 1 ? "checked" : ""}>
  <span onclick="setRating()"><label for="star1">☆</label></span>
</div>
    `;
  modalBody.innerHTML = largerCardContentScript;
  modal.show();
}

function displayRecTitle(){
  let header = document.getElementById("displayType")
  header.innerHTML = ""
  header.innerHTML = "Recommended Movies"
}
function displayAllTitle(){
  let header = document.getElementById("displayType")
  header.innerHTML = ""
  header.innerHTML = "All Movies"
}

function rateMovie(rating) {
  console.log("Rated movie with rating: " + rating);
}

//Function to close the modal and remove the current character card
function closeModal() {
  let modal = new bootstrap.Modal(document.getElementById('cardModal'));//I try tto make it close by repeating itself
  modal.hide();
}

let currentPage = 1; // Initialize current page to 1
const moviesPerPage = 9; // Number of movies to display per page

// Function to display movies for the current page
function displayMoviesForPage(pageNumber) {
    const startIndex = (pageNumber - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToShow = characters.slice(startIndex, endIndex);

    let displayDiv = document.getElementById("characterCardsContainer");
    displayDiv.dataset.display = "all"
    displayDiv.dataset.movieCount = characters.length
    displayDiv.innerHTML = ""; // Clear previous movies

    moviesToShow.forEach(movie => {
        createCharacterCard(movie);
    });

    displayAllTitle()
}

// Function to show next page of movies
function showNextPage() {
  let displayDiv = document.getElementById("characterCardsContainer");
  const displayType = displayDiv.dataset.display
  const movieCount = displayDiv.dataset.movieCount
    const totalPages = Math.ceil(movieCount / moviesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        if(displayType == "all"){
          displayMoviesForPage(currentPage);
        }else{
          showRecommended(currentPage)
        }
        
    }
}

// Function to show previous page of movies
function showPreviousPage() {
  let displayDiv = document.getElementById("characterCardsContainer");
  const displayType = displayDiv.dataset.display
    
    if (currentPage > 1) {
        currentPage--;
        if(displayType == "all"){
          displayMoviesForPage(currentPage);
        }else{
          showRecommended(currentPage)
        }
        
    }
}

// Initially display movies for the first page
displayMoviesForPage(currentPage);

