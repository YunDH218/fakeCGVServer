// https://velog.io/@yunsungyang-omc/Node.js-JWT-%EC%9D%B8%EC%A6%9D%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-Express-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Authentication successful
  try {
    req.decoded = jwt.verify(req.headers.accessToken, process.env.ACCESS_TOKEN_SECRET);
	req.decoded = jwt.verify(req.headers.refreshToken, process.env.REFRESH_TOKEN_SECRET);
    return next();
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
}