const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const createToken = require('../../utilities/createToken.js'); 

async function userSignInController(req, res) {
   try {
      const { email, password } = req.body;

      // Validate the input fields
      if (!email) {
         return res.status(400).json({
            message: "Please provide email",
            error: true,
            success: false
         });
      }
      if (!password) {
         return res.status(400).json({
            message: "Please provide password",
            error: true,
            success: false
         });
      }

      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
         return res.status(404).json({
            message: "User not found",
            error: true,
            success: false
         });
      }

      // Compare the provided password with the stored hashed password
      const checkPassword = await bcrypt.compare(password, user.password);
      console.log("checkPassword", checkPassword);

      if (checkPassword) {
         // If password matches, generate and return a token
         createToken(res, user._id);  // Assuming createToken returns the token
          res.status(200).json({
            data: user,
            success: true, 
            error: false,
            message: "User login successfully"
         });
      } 
      else {
         return res.status(401).json({
            message: "Incorrect password",
            error: true,
            success: false
         });
      }
   } catch (err) {
      console.error(err);
      return res.status(500).json({
         message: err?.message || "An unexpected error occurred",
         error: true,
         success: false
      });
   }
}

module.exports = userSignInController;
