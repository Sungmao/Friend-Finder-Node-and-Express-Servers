// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends.js.
// ===============================================================================

var friendsData = require('../data/friends.js');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
	// API GET Requests
	// Below code handles when users "visit" a page.
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function (req, res) {
		res.json(friendsData);
	});

	app.post('/api/friends', function (req, res) {
	
		var newFriend = req.body;
		
		console.log(newFriend);
		console.log(friendsData);
	
		var compatible = 0;
		var mostCompatibleNum = 0;

		for(var i=0; i<friendsData.length-1; i++){
			var totalDiff = 0;
			for(var j=0; j<friendsData[i].scores.length; j++){
				totalDiff+= Math.abs(newFriend.scores[j]-friendsData[i].scores[j]);
			}
			if(totalDiff>compatible)
			{
				compatible=totalDiff;
				mostCompatibleNum=i;
			}
		}
		friendsData.push(newFriend);
		res.send({ "name":friendsData[i].name,"photo":friendsData[i].photo });
	});
};
