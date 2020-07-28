const   express     = require('express'),
        bodyParser  = require('body-parser'),
        cors        = require('cors'),
        app         = express(),
        port        = 8000;


// Setup empty JS object to act as endpoint for all routes
let projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// GET route
app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
};

// POST route
app.post('/add', addData);

function addData (req, res){
  let {date, temp, content} = req.body;
  projectData.date = date;
  projectData.temp = temp;
  projectData.content = content;
    return projectData;
};

// Setup Server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))