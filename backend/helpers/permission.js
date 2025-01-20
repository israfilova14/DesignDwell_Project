const userModel = require("../models/userModel");

const uploadProductPermission = async(userId) => {
   const user = await userModel.findById(userId);
   if(!user.isAdmin){
      return false
   }
   else{
      return true
   }
}

module.exports = uploadProductPermission