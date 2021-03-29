const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Can the frontend do GET request
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

//Can post from frontend
const cors = require('cors');
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,            //access-control-allow-credentials:true
	optionSuccessStatus: 200
}
app.use(cors(corsOptions));

//Can write my original data file
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
const port = 8080
const fs = require('fs');

//My data
var contents = fs.readFileSync("./db.json");
var jsonContent = JSON.parse(contents);

//Array of characters
app.get('/characters', (req, res) => {
	res.send(jsonContent);
})

//404 error
app.use(function (req, res, next) {
	res.status(404).send("No such page can be found")
})

//Console log
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})