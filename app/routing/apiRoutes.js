var fs = require('fs');

module.exports = function(app, path) {

	// Show all friends available
	app.get('/api/friends', function(req, res) {
		fs.readFile("app/data/friends.js", "utf8", function(err, data) {
			if (err) {
				return console.log(err);
			} else {
				res.json(JSON.parse(data));
			}
		});
	});

	app.post('/api/friends', function(req, res) {
		// closest match object.
		var results = [];

		// string of JSON info
		var postResponse = JSON.stringify(req.body);

		fs.readFile('app/data/friends.js', function (err, data) {
			// Read the existing array
		    var friendFile = JSON.parse(data);

		    // Store the difference in values
		    var closestMatch = 0;
		    var matchScore = 999999999999999;

		    // Loop through the file to find the closest match
		    for (var i = 0; i < friendFile.length; i++) {
		    	var spaceBetween = 0;
		    	for (var j = 0; j < friendFile[i]['answers[]'].length; j++) {
		    		spaceBetween += Math.abs((parseInt(req.body['answers[]'][j]) - parseInt(friendFile[i]['answers[]'][j])));
				}

				// If the space between the current listing is the closest to the user, update the closestMatch
				if(spaceBetween <= matchScore) {
					matchScore = spaceBetween;
					closestMatch = i;
		    	}
		    }

		    // console.log("Closest match: " + friendFile[closestMatch].name);

		    results.push(friendFile[closestMatch]);

		    // Add the new person to the existing array
		    friendFile.push(JSON.parse(postResponse));

		    // Push back the entire updated result immediately
		    fs.writeFile("app/data/friends.js", JSON.stringify(friendFile));
			res.send(results[0]);

		});
	});
}