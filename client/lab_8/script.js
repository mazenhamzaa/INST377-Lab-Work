/* eslint-disable max-len */

/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/*
  ## Utility Functions
    Under this comment place any utility functions you need - like an inclusive random number selector
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

function injectHTML(list) {
    console.log('fired injectHTML');
    const target = document.querySelector('#restaurant_list');
    target.innerHTML = '';
    list.forEach((item)=> {
      const str = `<li>${item.name}</li>`
      target.innerHTML += str
    })
    
    }
  
  
  function processRestaurants(list) {
    console.log('fired restaurants list');
  
    /*
      ## Process Data Separately From Injecting It
        This function should accept your 1,000 records
        then select 15 random records
        and return an object containing only the restaurant's name, category, and geocoded location
        So we can inject them using the HTML injection function
  
        You can find the column names by carefully looking at your single returned record
        https://data.princegeorgescountymd.gov/Health/Food-Inspection/umjn-t2iz
  
      ## What to do in this function:
  
      - Create an array of 15 empty elements (there are a lot of fun ways to do this, and also very basic ways)
      - using a .map function on that range,
      - Make a list of 15 random restaurants from your list of 100 from your data request
      - Return only their name, category, and location
      - Return the new list of 15 restaurants so we can work on it separately in the HTML injector
    */
  }
  
  /*
    This last line actually runs first!
    It's calling the 'mainEvent' function at line 57
    It runs first because the listener is set to when your HTML content has loaded
  */
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  
  /*
    Hook this script to index.html
    by adding `<script src="script.js">` just before your closing `</body>` tag
  */
  
  /* A quick filter that will return something based on a matching input */
  function filterList(list, query) {
    return list.Filter((item)=> {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseName.includes(lowerCaseQuery)
    })
  }
  function cutRestaurantList(list) {
    console.log('fired cut list');
    const range = [...Array(15).keys()];
    return newArray = range.map((item)=> {
      const index = getRandomIntInclusive(0, list.length -1)
      return list[index]
    })
  }
    /*
      Using the .filter array method, 
      return a list that is filtered by comparing the item name in lower case
      to the query in lower case
  
      Ask the TAs if you need help with this
    */
  
  
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form');
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#resto')

  
    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = 'none';
    generateListButton.classList.add = ('hidden')

    const storedData = localStorage.getItem('storedData');
    const parsedData = JSON.parse(storedData);
    if (parsedData.length > 0 ){
      generateListButton.classList.remove = ('hidden');
    }
 
    let currentList = []; // this is "scoped" to the main event function
    
    /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
    loadDataButton.addEventListener('click', async (submitEvent) => {
      console.log('Loading data')
      loadAnimation.style.display = 'inline-block'; // async has to be declared on every function that needs to "await" something
      
      // This prevents your page from becoming a list of 1000 records from the county, even if your form still has an action set on it
      submitEvent.preventDefault(); 
      
      // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
      console.log('form submission'); 
  
      /*
        ## GET requests and Javascript
          We would like to send our GET request so we can control what we do with the results
          Let's get those form results before sending off our GET request using the Fetch API
      
        ## Retrieving information from an API
          The Fetch API is relatively new,
          and is much more convenient than previous data handling methods.
          Here we make a basic GET request to the server using the Fetch method to the county
      */
  
      // Basic GET request - this replaces the form Action
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  
      // This changes the response from the GET into data we can use - an "object"
      const storedList = await results.json();
      localStorage.setItem('storedData', JSON.stringify(storedList));
      

      loadAnimation.style.display = ('none');
      // console.table(storedList); 
      
    });
  
  
    generateListButton.addEventListener('click', (event)=> {
    console.log('generate new list');
    currentList = cutRestaurantList(storedList);
    console.log(currentList);
    injectHTML(currentList);
    })

    textField.addEventListener('input', (event)=> {
       console.log('input', event.target.value);
       const newList = filterList(currentList, event.target.value);
       console.log(newList);
       injectHTML(newList);
    }) 
  };
  
  /*
    This adds an event listener that fires our main event only once our page elements have loaded
    The use of the async keyword means we can "await" events before continuing in our scripts
    In this case, we load some data when the form has submitted
  */
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  
  