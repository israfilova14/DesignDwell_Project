const basketProductCartModel = require("../../../models/basketProductCartModel");

const updateBasketProductCart = async(req, res) => {
     try{
       const currentUserId = req?.userId;
       const addToBasketProductId = req.body?._id;
       const qty = req.body.quantity;

       console.log("Updating product ID:", addToBasketProductId, "for user ID:", currentUserId);

       const updateProduct = await basketProductCartModel.updateOne(
         {_id: addToBasketProductId, userId: currentUserId},
         {$set: {quantity: qty}}
       );

       if(updateProduct.matchedCount === 0){
        return res.status(404).json({
           message: 'Product not found or quantity not modified',
           error: true,
           success: false
        })
       }
       res.json({
        message: "Product updated",
        data: updateProduct,
        error: false,
        success: true
     })
     }
     catch(err){
        res.status(400).json({
           message: err?.message, 
           success: false, 
           error: true
        })
     }
}

module.exports = updateBasketProductCart