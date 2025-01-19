const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel.js')

const authenticate = async(req, res, next) => {
  let token
  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt
  if(token){
     try{
        // Verify token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        req.user = await userModel.findById(decoded.userId).select('-password')
        next()
     }catch(error){
        res.status(401)
        res.json({message: 'Not authorized, token failed'})
     }
  }
  else{
      res.status(401)
      res.json({message: 'Not authorized, no token'})
  }
}

const authorizeAdmin = (req, res, next) => {
   if(req.user && req.user.isAdmin){
      next()
   }
   else{
      res.status(401)
      res.json({message: "Not authorized as an admin token"})
   }
}

module.exports = {authenticate, authorizeAdmin}