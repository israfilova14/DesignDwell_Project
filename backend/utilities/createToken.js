const jwt = require('jsonwebtoken')

const createToken = (res, userId) => {
   try{
      if(!process.env.TOKEN_SECRET_KEY){
          console.error("JWT_SECRET_KEY is missing in the environment variables")
          throw new Error("JWT_SECRET_KEY is required for generating token")
      }

      // Create JWT token
      const token = jwt.sign(
        {userId},
        process.env.TOKEN_SECRET_KEY,
        {expiresIn: '10d'}
      )

      // Set JWT as an HTTP Only Cookie
      res.cookie('jwt', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production' || true,
         sameSite: 'None',
         maxAge: 10 * 24 * 60 * 60 * 1000
      })

      return token
   }catch(error){
      console.error('Error generating token:', error.message)
      throw new Error('Error generating token')
   }
}

module.exports = createToken