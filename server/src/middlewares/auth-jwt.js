const jwt = require('jsonwebtoken');
var fs = require('fs');

module.exports = function (req, res, next) {
  //Do your session checking...
  // res.send('auth')
  // return
  // console.log(JSON.stringify(req.headers));
  let token = req.headers.authorization

  if (typeof token === 'undefined') {
    return res.status(401).json({
      message: '401 Unauthorized, no token',
    })
  }
  var publicKey = fs.readFileSync('public.key');
  const bearer = token.split(" ");
  token = bearer[1].trim();
  try {
    var ver = jwt.verify(token, publicKey, { algorithm: 'RS256' });
    // console.log('ver', ver)
    req.body.user = ver.data
    next();
  } catch (error) {

    return res.status(401).json({
      message: '401 Unauthorized, bad token',
    })
  }
};