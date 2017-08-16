'use strict';
var accessToken;

module.exports = (router, foursquare, config) => {

	router.get('/api', function(req, res) {
  		res.writeHead(303, { 'location': foursquare.getAuthClientRedirectUrl() });
  		res.end();
	});


	router.get('/callback', function (req, res) {
	  foursquare.getAccessToken({
	    code: req.query.code
	  }, function (error, accessToken) {
	    if(error) {
	      res.send('An error was thrown: ' + error.message);
	    }
	    else {
	       res.status(res.status).json({ message: res.message, token: accessToken });
	       //res.redirect('/places?token='+accessToken);
	    }
	  });
	});

	router.get('/hello', function (req, res) {
	  res.send('Hello World!')
	  console.log('I received')
	})

	router.get('/places', function (req, res) {
	  var accessToken = req.query.token;
	  var lat = 49.872677;
	  var lng = 8.632473;
	  var near = null
	  var cb = function(error, json) {
	  	var response = [];
	  	var groups = json.groups;
	  	for (var group in groups) {
	  		var items = groups[group].items;
		  	for (var item in items) {
		  		var json = {};
		  		json.id = items[item].venue.id;
		  		json.name = items[item].venue.name;
		  		json.lat = items[item].venue.location.lat;
		  		json.lng = items[item].venue.location.lng;
		  		response.push(json);
		  	}
	  	}
	  	res.send(response);

	  }
	  var venues = foursquare.Venues.explore(lat, lng, near, config, accessToken, cb);
	  console.log(JSON.stringify(venues));
	})


}