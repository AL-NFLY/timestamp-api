// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
let listener = app.listen(3003, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

let resObj = {};
app.get('/api/:date', (req, res) => {
  let date = req.params.date;

  if (!date.includes('-') && !date.includes(' ')) {
    //Timestamp
    date = parseInt(date);
    resObj['unix'] = new Date(date).getTime();
    resObj['utc'] = new Date(date).toUTCString();
  } else {
    //Date String (year-month-day)
    resObj['unix'] = new Date(date).getTime();
    resObj['utc'] = new Date(date).toUTCString();
  }
  //If date is invalid
  if (!resObj['unix'] || !resObj['utc']) {
    res.json({ error: 'Invalid Date' });
  }
  res.json(resObj);
});

app.get('/api', (req, res) => {
  resObj['unix'] = new Date().getTime();
  resObj['utc'] = new Date().toUTCString();
  res.json(resObj);
});
