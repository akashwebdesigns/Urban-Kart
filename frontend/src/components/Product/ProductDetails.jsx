import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetail, newReview } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ReviewCard from "./ReviewCard";
import Rating from "@material-ui/lab/Rating";
import Loader from "../Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetail = () => {
  let [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const alert = useAlert();
  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      quantity = quantity + 1;
    }
    setQuantity(quantity);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    quantity = quantity - 1;
    setQuantity(quantity);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      return alert.error(error.message);
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetail(id));
  }, [dispatch, id, error, alert,reviewError,success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Fragment>
            <MetaData title={product.name} />
            <div className="ProductDetails">
              <div>
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>

              <div>
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <Rating
                    name="half-rating"
                    defaultValue={Number(product.rating)}
                    precision={0.5}
                    readOnly
                    size="large"
                  />
                  <span className="detailsBlock-2-span">
                    {" "}
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <h1 style={{ color: "red" }}>{`₹${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="text" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button
                      disabled={product.stock < 1 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <p>
                    Status:
                    <b
                      className={product.stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.stock < 1 ? " OutOfStock" : " InStock"}
                    </b>
                  </p>
                </div>

                <div className="detailsBlock-4">
                  Description : <p>{product.description}</p>
                </div>

                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>

            {/* Review Dialog  */}
            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </Fragment>
        </>
      )}
    </>
  );
};

export default ProductDetail;
