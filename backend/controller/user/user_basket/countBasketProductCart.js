const basketProductModel = require("../../../models/basketProductCartModel");

const countBasketProductCart = async(req, res) => {
  try{
     const userId = req?.user?._id;
     const count = await basketProductModel.countDocuments({
        userId: userId
     })   
     res.json({
       data: {
        count: count
       },
       message: "Ok",
       success: true,
       error: false
     })
  }catch(err){
    res.status(400).json({
      message: err?.message,
      error: true,
      success: false
    })
  }
}

module.exports = countBasketProductCart