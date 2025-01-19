const userModel = require("../../models/userModel")

async function userDetailController(req, res){
   try{
      const user = await userModel.findById(req.user._id);
      
      res.status(200).json({
        data: user,
        error: false,
        success: true,
        message: "User created successfully"
      })
      console.log("user", user);
      
   }catch(err){
      res.status(400).json({
        message: err?.message,
        error: true,
        success: false
      })
   }
}
module.exports = userDetailController