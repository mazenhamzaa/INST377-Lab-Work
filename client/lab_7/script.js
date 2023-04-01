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
  
    /*
    ## JS and HTML Injection
      There are a bunch of methods to inject text or HTML into a document using JS
      Mainly, they're considered "unsafe" because they can spoof a page pretty easily
      But they're useful for starting to understand how websites work
      the usual ones are element.innerText and element.innerHTML
      Here's an article on the differences if you want to know more:
      https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
  
    ## What to do in this function
      - Accept a list of restaurant objects
      - using a .forEach method, inject a list element into your index.html for every element in the list
      - Display the name of that restaurant and what category of food it is
  */
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
  
  async function mainEvent() {
    /*
      ## Main Event
        Separating your main programming from your side functions will help you organize your thoughts
        When you're not working in a heavily-commented "learning" file, this also is more legible
        If you separate your work, when one piece is complete, you can save it and trust it
    */
  
    // the async keyword means we can make API requests
    const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
    const submit = document.querySelector('button[type="submit"]'); // get a reference to your submit button
    submit.style.display = 'none'; // let your submit button disappear
  
    /*
      Let's get some data from the API - it will take a second or two to load
      This next line goes to the request for 'GET' in the file at /server/routes/foodServiceRoutes.js
      It's at about line 27 - go have a look and see what we're retrieving and sending back.
     */
    const results = await fetch('/api/foodServicesPG');
    const arrayFromJson = await results.json(); // here is where we get the data from our request as JSON
  
    /*
      Below this comment, we log out a table of all the results using "dot notation"
      An alternate notation would be "bracket notation" - arrayFromJson["data"]
      Dot notation is preferred in JS unless you have a good reason to use brackets
      The 'data' key, which we set at line 38 in foodServiceRoutes.js, contains all 1,000 records we need
    */
    console.table(arrayFromJson.data);
  
    // in your browser console, try expanding this object to see what fields are available to work with
    // for example: arrayFromJson.data[0].name, etc
    console.log(arrayFromJson.data[0]);
  
    // this is called "string interpolation" and is how we build large text blocks with variables
    console.log(`${arrayFromJson.data[0].name} ${arrayFromJson.data[0].category}`);
  
    // This IF statement ensures we can't do anything if we don't have information yet
    if (arrayFromJson.data?.length > 0) { // the question mark in this means "if this is set at all"
      submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available
  
      // And here's an eventListener! It's listening for a "submit" button specifically being clicked
      // this is a synchronous event event, because we already did our async request above, and waited for it to resolve
      form.addEventListener('submit', (submitEvent) => {
        // This is needed to stop our page from changing to a new URL even though it heard a GET request
        submitEvent.preventDefault();
  
        // This constant will have the value of your 15-restaurant collection when it processes
        const restaurantList = processRestaurants(arrayFromJson.data);
  
        // And this function call will perform the "side effect" of injecting the HTML list for you
        injectHTML(restaurantList);
  
        // By separating the functions, we open the possibility of regenerating the list
        // without having to retrieve fresh data every time
        // We also have access to some form values, so we could filter the list based on name
      });
    }
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
  }
  
  async function mainEvent() { // the async keyword means we can make API requests
    const mainForm = document.querySelector('.main_form');
    const filterDataButton = document.querySelector('#filter'); // This class name needs to be set on your form before you can listen for an event on it
    const loadDataButton = document.querySelector('#data_load');
    const generateListButton = document.querySelector('#generate');
    const textField = document.querySelector('#resto')

  
    const loadAnimation = document.querySelector('#data_load_animation');
    loadAnimation.style.display = ('none');
  
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
      currentList = await results.json();
      loadAnimation.style.display = ('none');
      console.table(currentList); 
      
    });
  
  filterDataButton.addEventListener('click', (event)=> {
    console.log('clicked FilterButton');
  
    const formData = new FormData(mainForm);
    const formProps = Object.fromEntries(formData);
  
    console.log(formProps);
    const newList = filterList(currentList, formProps.resto);
    console.log(newList);
    injectHTML(newList);
  })
  
  generateListButton.addEventListener(('click', (event)=> {
    console.log('generate new list');
    const restaurantsList = cutRestaurantList(currentList);
    injectHTML(restaurantsList);
  
  })
  
    /*
      Now that you HAVE a list loaded, write an event listener set to your filter button
      it should use the 'new FormData(target-form)' method to read the contents of your main form
      and the Object.fromEntries() method to convert that data to an object we can work with
  
      When you have the contents of the form, use the placeholder at line 7
      to write a list filter
  
      Fire it here and filter for the word "pizza"
      you should get approximately 46 results
    */
   textField.addEventListener('input', (event)=> {
       console.log('input', event.target.value);

   }) 
  }
  
  /*
    This adds an event listener that fires our main event only once our page elements have loaded
    The use of the async keyword means we can "await" events before continuing in our scripts
    In this case, we load some data when the form has submitted
  */
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
  
  