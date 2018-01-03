const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

/*db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('mongoose connected');
})*/

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  id: Number,
  name: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var addRepo = new Repo ({
  	username: repo.username,
  	id: repo.id,
  	name: repo.name,
  	url: repo.url
  });

  addRepo.save()
  	.then( product => {
  		console.log('saved!');
  	})
  	.catch (error => {
  		console.log('not saved!');
  	});
}

let get = (callback) => {
	Repo.find().limit(25).exec(
		function(error, result) {
			if (error) {
				callback(error, null);
			} else {
				callback(null, result);
			}
	})
}

module.exports.save = save;
module.exports.get = get;