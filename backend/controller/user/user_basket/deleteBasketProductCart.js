const basketProductCartModel = require("../../../models/basketProductCartModel");

const deleteBasketProductCart = async(req, res) => {
   try{
      const currentUserId = req?.user?._id;
      const addToBasketCartProductId = req.body._id;

      const deleteProduct = await basketProductCartModel.deleteOne({
        _id: addToBasketCartProductId
      })

      res.json({
         message: "Product deleted from your basket",
         error: false,
         success: true,
         data: deleteProduct
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
module.exports = deleteBasketProductCart