module.exports = function (req, res, next) {

  try {
    const i = req.body.user.scopes.find((item) => item == process.env.MS_SCOPE)
    // console.log('super: ', i)
    if (typeof i === "undefined") {
      throw "Error";
    }
    next();
  } catch (error) {
    return res.status(403).json({
      message: '403 forbidden',
    })
  }
};