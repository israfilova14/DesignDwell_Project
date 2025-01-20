const basketProductCartModel = require("../../../models/basketProductCartModel");

const addToBasketController = async(req, res) => {
   try{
      const {productId} = req.body;

      const currentUser = req?.user?._id;

      if(!currentUser){
         return res.status(401).json({
            message: "User not authenticated",
            success: false,
            error: true
         })
      }

      if(!productId){
         return res.status(400).json({
            message: "Product ID is required",
            success: false,
            error: true
         })
      }

      const isProductAvailable = await basketProductCartModel.findOne({productId, userId: currentUser});
      console.log("isProductAvailable", isProductAvailable);
      
      if(isProductAvailable){
         return res.json({
           message: "Product already exists in Basket",
           success: false,
           error: true
         })
      }

      const payload = {
         productId: productId,
         quantity: 1,
         userId: currentUser
      }

      const newAddToBasketCart = new basketProductCartModel(payload);
      const saveProduct = newAddToBasketCart.save();

      res.status(201).json({
         data: saveProduct,
         message: "Product added to the basket",
         success: true,
         error: false
      })
   }
   catch(err){
      console.error("Error adding to the basket cart:", err.message);
      res.status(500).json({
         message: "An error occurred while adding the product to the basket cart",
         error: true,
         success: false
      })
   }
}

module.exports = addToBasketController