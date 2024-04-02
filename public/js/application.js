let topElement = document.getElementById('topmatter');
let bottomElement = document.getElementById('bottommatter');

function getAll(){
  var xhttp = new XMLHttpRequest();
  let data = '';
  xhttp.open('GET', 'http://localhost:3050/api/character',false);
  xhttp.setRequestHeader('Accept','application/json');
  xhttp.send();
  if (xhttp.status == 200) {
    data = JSON.parse(xhttp.responseText);
  } else {
    alert("There is something wrong.  Please try again later.");
  }
  return data;
}
// Iterate through each character and create a clickable link in the 'topmatter' element
console.log(getAll());
let characters = getAll();
characters.forEach(element => {
  let linkNode =  document.createElement('div');
  //linkNode.innerText = element;
  linkNode.setAttribute('onclick',`populateChar(${element.id})`);
  topElement.appendChild(linkNode);
// Create and append character cards side by side
   createCharacterCard(element);
});

function getOne(id){
  let xhttp = new XMLHttpRequest();
  let charData = '';
  xhttp.open('GET', `http://localhost:3050/api/character/${id}`,false);
  xhttp.setRequestHeader('Accept','application/json');
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
                <img src="img/${element.image}" class="card-img-top" alt="${element.name}" style="object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title text-center">${element.name}</h5> <!-- Centered title -->
                    <p class="card-text">${element.desc}</p>
                    <span class="heart-icon">&#10084;</span> <!-- Added empty heart icon added an id-->
                </div>
            </div>
        `;
        characterCard.innerHTML = cardContentScript;
        characterCardsContainer.appendChild(characterCard);
    
        // Add hover effect using JavaScript
        characterCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.3)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    
        characterCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }
//Function to show the larger card content in the modal
function showLargerCard(element) {
    let modal = new bootstrap.Modal(document.getElementById('cardModal'));
    let modalBody = document.querySelector('.modal-body');

    //Each character card include the character name, description, full size image and a closing button
    let largerCardContentScript = `
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button> 
        <img src="img/${element.image}" style= "object-fit: cover;">
        <class="img-fluid" alt="${element.name}">
        <h2>${element.name}</h2>
        <p>${element.desc}</p>
        <div>
        <h3>Rate this Movie:</h3>
        <button type="button" class="btn btn-primary" onclick="rateMovie(1)">1</button>
        <button type="button" class="btn btn-primary" onclick="rateMovie(2)">2</button>
        <button type="button" class="btn btn-primary" onclick="rateMovie(3)">3</button>
        <button type="button" class="btn btn-primary" onclick="rateMovie(4)">4</button>
        <button type="button" class="btn btn-primary" onclick="rateMovie(5)">5</button>
    </div>
    `;
    modalBody.innerHTML = largerCardContentScript;
    modal.show();
}

function rateMovie(rating) {
  console.log("Rated movie with rating: " + rating);
}

//Function to close the modal and remove the current character card
function closeModal() {
    let modal = new bootstrap.Modal(document.getElementById('cardModal'));//I try tto make it close by repeating itself
    modal.hide();
}
