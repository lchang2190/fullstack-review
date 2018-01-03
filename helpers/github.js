const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let user = username;
  //console.log('helper', username);
  let options = {
    url: 'https://api.github.com/users/' + user + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(error, results) {
    if (error) {
      callback(error, null);
    } else { 
      var body = JSON.parse(results.body);
      console.log(body);
      var repos = [];
      for(var i = 0; i < body.length; i++) {
        var obj = { 
          username: body[i].owner.login, 
          id: body[i].id, 
          name: body[i].name,
          url: body[i].html_url
        }
        repos.push(obj);
      }
      callback(null, repos);
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;