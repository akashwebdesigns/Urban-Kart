const express=require("express");
const router=express.Router();
const{isAuthenticatedUser, authorizeRoles}=require("../middleware/auth");
const {getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getProductReviews, getAllAdminProducts}=require("../controllers/productController");

//Get All the Products
router.route("/products").get(getAllProducts);
//Get All Admin products
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAllAdminProducts);

//Create Product--Admin

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin") ,createProduct);

//Get,Update and Delete Product --Admin
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);


module.exports=router;