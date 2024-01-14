const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const userdata = require('../../util/userdata.js');

// generate access token based on secret key
const generateAccessToken = user => jwt.sign(
	{ username: user.username },
	process.env.ACCESS_TOKEN_SECRET,
	{ expiresIn: "1h" }
);

// generate refersh token based on secret key
const generateRefreshToken = user => jwt.sign(
	{ username: user.username },
	process.env.REFRESH_TOKEN_SECRET,
	{ expiresIn: "180 days" }
);

router.post('/', async function(req, res, next) {
	const { username, password } = req.body;
	const user = await userdata.findUserByUsername(username);
	
	// invalid user
	if (!user) return res.status(401).send('please check your ID.');
	
	// invalid password
	if (user.password !== password) return res.status(401).send('please check your password.')
	
	console.log(username + 'logined');
	
	return res.status(200).send({
		'accessToken': generateAccessToken(user),
		'refreshToken': generateRefreshToken(user)
	});
});

module.exports = router;
