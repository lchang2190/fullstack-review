const express = require('express');
let app = express();
const APIgit = require('../helpers/github.js');
const bodyParser = require('body-parser');
const db = require('../database/index.js');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
	APIgit.getReposByUsername(req.body.username, function(error, result) {
		if (error) {
			console.log('api error', error)
		} else {
			for (var i = 0; i < result.length; i++) {
				db.save(result[i]);
			}
			res.send();  
		}
	})
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get( (error, results) => {
  	if (error) {
  		console.log('error:', error);
  	} else {
  		res.send(results);
  	}
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

