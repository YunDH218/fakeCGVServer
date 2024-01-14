// https://velog.io/@yunsungyang-omc/Node.js-JWT-%EC%9D%B8%EC%A6%9D%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-Express-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', function (req, res, next) {
  // Authentication successful
  try {
    req.decoded = jwt.verify(req.headers.accesstoken, process.env.ACCESS_TOKEN_SECRET);
	req.decoded = jwt.verify(req.headers.refreshtoken, process.env.REFRESH_TOKEN_SECRET);
	
    return res.status(200).json({
		code: 200,
		message: 'Valid token',
	});
  }
  
  // Authentication failed
  catch(error) {
    if (error.name === 'TokenExpireError') {
      return res.status(419).json({
        code: 419,
        message: 'The token has expired.'
      });
    }
   return res.status(401).json({
     code: 401,
     message: 'Invalid token.'
   });
  }
});

module.exports = router;