const express = require('express');
const router = express.Router();

const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailController = require('../controller/user/userDetail');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const removeUserController = require('../controller/user/removeUser');
const removeProductController = require('../controller/product/removeProduct');
const getCategoryProduct = require('../controller/product/getCategoryProduct');
const getProductByCategory = require('../controller/product/getProductByCategory');
const getProductDetails = require('../controller/product/getProductDetails');
const addToBasketController = require('../controller/user/user_basket/addToBasketController');
const addToBasketViewProduct = require('../controller/user/user_basket/addToBasketViewProduct');
const deleteBasketProductCart = require('../controller/user/user_basket/deleteBasketProductCart');
const updateBasketProductCart = require('../controller/user/user_basket/updateBasketProductCart');
const countBasketProductCart = require('../controller/user/user_basket/countBasketProductCart');
const addToFavoriteController = require('../controller/user/user_favorite/addToFavoriteController');
const addToFavoriteViewProduct = require('../controller/user/user_favorite/addToFavoriteViewProduct');
const deleteFavoriteProductCart = require('../controller/user/user_favorite/deleteFavoriteProductCart');
const countFavoriteProduct = require('../controller/user/user_favorite/countFavoriteProductCart');
const filterProductController = require('../controller/product/filterProduct');
const searchProductController = require('../controller/product/searchProduct');
const {authenticate , authorizeAdmin} = require('../middleware/authToken.js')

// Users
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authenticate, userDetailController);
router.get("/userLogout", userLogout);

// Admin Panel
router.get("/all-users", authenticate, authorizeAdmin, allUsers);
router.post("/update-user", authenticate, authorizeAdmin, updateUser);
router.post("/delete-user", authenticate, authorizeAdmin, removeUserController);
router.post("/delete-product", authenticate, authorizeAdmin, removeProductController);

// Products
router.post("/upload-product", authenticate, authorizeAdmin, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authenticate,authorizeAdmin, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getProductByCategory);
router.post("/product-details", getProductDetails);
router.post("/filter-product", filterProductController);
router.get("/search", searchProductController);

// User Add To Basket
router.post("/add-to-basket", authenticate, addToBasketController);
router.get("/count-basket-product", authenticate, countBasketProductCart);
router.get("/view-basket-product", authenticate, addToBasketViewProduct);
router.post("/update-basket-product", authenticate,updateBasketProductCart);
router.post("/delete-basket-product", authenticate, deleteBasketProductCart);

// User Add To Favorite
router.post("/add-to-favorite", authenticate, addToFavoriteController);
router.get("/view-favorite-product", authenticate, addToFavoriteViewProduct);
router.post("/delete-favorite-product", authenticate, deleteFavoriteProductCart);
router.get("/count-favorite-product", authenticate, countFavoriteProduct);

module.exports = router