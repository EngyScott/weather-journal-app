/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e11e5834b84ef1ecc09b19acf294ba59';
// Create a new date instance dynamically with JS
let d = new Date();
const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// Generate fetching data by generate button click event listener;
document.getElementById('generate').addEventListener('click', performAction);

/* Trigger data functions on click event */
function performAction(event) {
  // Stop instant form supmission
  event.preventDefault();
  // get user input values
  const cityZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  // 
  getWeather(baseURL, cityZip, apiKey)
    .then(function (userInfo) {
      // POST data
      postData('/add', { date: newDate, temp: userInfo.main.temp, content })
    })
    .then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    })
  // reset form
  
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, cityZip, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL+cityZip+apiKey);
  try {
    // assign fetched data to userInfo
    const userInfo = await res.json();
    return userInfo;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
    try {
      const newData = await res.json();
      console.log (newData);
      return newData;
    }catch (error) {
      console.log('error', error);
    }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    let allData = await request.json()
    // update HTML
    document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
    document.getElementById('temp').innerHTML = `Recent Temprature is: ${allData[0].temp}`;
    document.getElementById('content').innerHTML = `And you Feel ${allData[0].content}`;
    allData =[];
    document.getElementById('zip').value = " ";
    document.getElementById('feelings').value = " ";
  }
  catch (error) {
    console.log("error", error);
  }
};