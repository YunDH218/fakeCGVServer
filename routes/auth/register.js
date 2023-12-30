var express = require('express');
var router = express.Router();

var userdata = require('../../modules/userdata.js')

router.post('/', async function(req, res, next) {
	const { username, password, email } = req.body;
	
	const result = await userdata.createUser(username, password, email)
	
	if (result instanceof Error) return res.status(401).send('The username or email is already exists.');
	return res.status(200).send('Account successfully created.');
	
});

module.exports = router;