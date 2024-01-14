var express = require('express');
var router = express.Router();

var userdata = require('../../util/userdata.js')

router.post('/', async function(req, res, next) {
	const { username, password, email, phone, birthday, gender } = req.body;
	
	const result = await userdata.createUser(username, password, email, phone, birthday, gender);
	
	if (result instanceof Error) {
		const keyPattern = Object.keys(result?.keyPattern)[0];
		const keyValue = Object.values(result?.keyValue)[0];
		return res.status(401).send(`The ${keyPattern} "${keyValue}" is already exists`);
	}
	return res.status(200).send('Account successfully created.');
});

module.exports = router;