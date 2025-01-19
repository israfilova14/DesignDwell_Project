const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const createToken = require('../../utilities/createToken.js') 

async function userSignInController(req, res){
   try{
      const {email, password} = req.body;

      if(!email){
         throw new Error("Please provide email")
      }
      if(!password){
        throw new Error("Please provide password")
      }

      const user = await userModel.findOne({email});
      if(!user){
         throw new Error("User not found")
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      console.log("checkPassword", checkPassword);

      if(checkPassword){
         createToken(res, user._id)
      }
      else{
        throw new Error("Please check password !")
      }
      
   }catch(err){
     res.status(500).json({
      message: err?.message,
      error: true,
      success: false
     })
   }
}

module.exports = userSignInController