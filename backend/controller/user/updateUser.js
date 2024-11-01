const userModel = require("../../models/userModel");

async function updateUser(req, res) {
   try{
     const {userId, name, email, role} = req.body;

     const payload = {
       ...(name && {name}),
       ...(email && {email}),
       ...(role && {role}),
     }

     const updateUser = await userModel.findByIdAndUpdate(userId, payload, {new: true});
     if(!updateUser){
       return res.status(404).json({
         message: "User not found",
         error: true,
         success: false
       })
     }
     
     res.json({
       data: updateUser,
       message: "User Updated Successfully",
       success: true,
       error: false
     })
   }
   catch(err){
     res.status(500).json({
       message: err?.message || 'An error occurred while updating user',
       error: true,
       success: false,
     })
   }
}
module.exports = updateUser