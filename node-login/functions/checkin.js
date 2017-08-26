'use strict';

const checkin = require('../models/checkin');


exports.checkinVenue = (id, email) => 
	new Promise((resolve,reject) => {
		console.log("reaching here");

		const newCheckin = new checkin({

			venueId: id,
			userEmail: email1
		});

		newCheckin.save()

		.then(() => resolve({ status: 201, message: 'Checkin done' }))

		.catch(err => {

			if (err.code == 11000) {
						
				reject({ status: 409, message: 'ErrorS' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});
