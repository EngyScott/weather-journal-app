/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e11e5834b84ef1ecc09b19acf294ba59';
// Create a new date instance dynamically with JS
let d = new Date();
const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// Generate fetching functions by generate button click event;
document.getElementById('generate').addEventListener('click', performAction);

/* Processing Functions */
function performAction(event) {
  // Stop instant form supmission
  event.preventDefault();
  // get user input values
  const cityZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  // Fetch data from openweathermap with user credintials
  getWeather(baseURL, cityZip, apiKey)
    // process data coming from endpoint
    .then(function (userInfo) {
      // POST data to data array
      postData('/add', { date: newDate, temp: userInfo.main.temp, content })
    })
    // retrieve data array data to update HTML
    .then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    })  
}

/* Fetch openweathermap data with user credintials */
const getWeather = async (baseURL, cityZip, apiKey) => {
  if(cityZip){
    // assig res to the fetched data
    const res = await fetch(baseURL+cityZip+apiKey);
    try {
      // assign processed fetched data to userInfo
      const userInfo = await res.json();
      // return user info
      return userInfo;
      // Catch errors
    } catch (error) {
      console.log("error", error);
    }
  }else{
    return alert('Please Enter City Zip Code')
  }
}

/* Send data to server*/
const postData = async (url = '', data = {}) => {
  // assign processed data to response & set credentials
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    // make data readable
    body: JSON.stringify(data)
  });
    try {
      const newData = await res.json();
      // pass data on
      return newData;
      // OR catch errors
    }catch (error) {
      console.log('error', error);
    }
};

/* Render fetched data on browser */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    let allData = await request.json()
    // update HTML
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Recent Temprature is: ${Math.round(allData.temp)} F`;
    document.getElementById('content').innerHTML = `And you Feel ${allData.content}`;
  }
  catch (error) {
    console.log("error", error);
  }
};