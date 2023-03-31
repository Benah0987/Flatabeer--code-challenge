// Set the API endpoint URL
const apiHost = "https://my-json-server.typicode.com/njmwasmoringa/FlataBeer-Code-Challenge"; //"http://localhost:3000";

//A function that fetchs and load all beers from the API
function getAndLoadAllBeers(){
    // Fetch data from the API endpoint for beers
    fetch(`${apiHost}/beers`)
        // Convert response to JSON format
        .then(resp=>resp.json())
        // Process the beers array and populate the webpage with clickable list items
        .then(beers=>{
            document.getElementById('beer-list').innerHTML = beers
                .map(beer=>`<li onClick="getAndLoadBeerDetails(${beer.id})">${beer.name}</li>`)
                .join('');
        })
}

// Fetch and load details for a specific beer from the API
function getAndLoadBeerDetails(beerId){
    // Fetch data from the API endpoint for the specific beer
    fetch(`${apiHost}/beers/${beerId}`)
        // Convert response to JSON format
        .then(resp=>resp.json())
        // Process the beer object and populate the webpage with the beer's details
        .then(beer=>{
            console.log(beer);
            document.getElementById('beer-name').innerHTML = beer.name;
            document.getElementById('beer-image').src = beer.image_url;
            document.getElementById('beer-description').innerHTML = beer.description;
            document.getElementById('review-list').innerHTML = beer.reviews.map(review=>`<li>${review}</li>`).join('');
        });
}

// a DOMcontent loaded for DOM to load before executing code
document.addEventListener('DOMContentLoaded', ()=>{
    // Load all beers and the details for the first beer on page load
    getAndLoadAllBeers();
    getAndLoadBeerDetails(1);

    // Listen for form submission events on the description form
    document.getElementById('description-form').addEventListener('submit', (evt)=>{
        //prevents loading of the page
        evt.preventDefault();
        const form = evt.target;
        // Update the beer description on the webpage
        document.getElementById('beer-description').innerHTML = form.description.value;
        form.reset();
    });

    // Listen for form submission events on the review form
    document.getElementById('review-form').addEventListener('submit', evt=>{
        evt.preventDefault();
        const form = evt.target;
        // Add a new review to the list on the webpage
        document.getElementById('review-list').innerHTML += `<li>${form.review.value}</li>`;
        form.reset();
    })
})```
