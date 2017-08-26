'use strict';

const testuser = require('../models/checkin');

exports.checkInVenue = (name, email) => 

	new Promise((resolve,reject) => {


		const newUser = new testuser({

			venue_id: name,
			email: email,
			created_at: new Date()
		});

		newUser.save()

		.then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

		.catch(err => {

			if (err.code == 11000) {
						
				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});


