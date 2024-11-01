const jwt = require("jsonwebtoken");

async function authToken(req, res, next){
  try{
   const token = req.cookies?.token;
   // Check if token exists
   if(!token){
     return res.status(401).json({
       message: "Please login",
       error: true,
       success: false
     });
   }

   // Verify JWT 
   jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if(err){
         return res.status(403).json({
            message: "Invalid or expired token",
            error: true,
            success: false
         })
      }
      
      req.user = req.user || {};
      req.userId = decoded._id;

      next()
   })
  }catch(err){
     return res.status(500).json({
       message: "An error occured during authentication",
       error: true,
       success: false,
       details: err?.message
     })
  }
}

module.exports = authToken