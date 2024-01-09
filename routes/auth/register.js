var express = require('express');
var router = express.Router();

var userdata = require('../../modules/userdata.js')

router.post('/', async function(req, res, next) {
	const { username, password, email, phone, birthday, gender } = req.body;
	
	const result = await userdata.createUser(username, password, email, phone, birthday, gender);
	
	// TODO: 유일성을 해치는 인자가 무엇인지 result에 드러나도록 반환하게 할 것
	// if (result instanceof Error) return res.status(401).send('The username or email is already exists.');
	if (result instanceof Error) return res.status(401).send(result);
	return res.status(200).send('Account successfully created.');
	
});

module.exports = router;