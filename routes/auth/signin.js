const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const userdata = require('../../modules/userdata.js');

// generate access token based on secret key
const generateAccessToken = user => jwt.sign(
	{ username: user.username },
	process.env.ACCESS_TOKEN_SECRET,
	{ expiresIn: "15m" }
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
	if (!user) return res.status(401).send({ error: 'please check your ID.' });
	
	// invalid password
	if (user.password !== password) return res.status(401).send({ error: 'please check your password.' })
	
	console.log('login success');
	
	res.cookie('accessToken', generateAccessToken(user));
	res.cookie('refreshToken', generateRefreshToken(user));
	return res.status(200).send('login success');
});

module.exports = router;
