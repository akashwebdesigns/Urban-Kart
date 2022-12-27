import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProduct } from "../../actions/productAction";
import {
  Grid,
  Typography,
  Slider,
  Button,
  Modal,
  Fade,
  Backdrop,
  ButtonGroup,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Product from "../Featured/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./Products.css";
import Loader from "../Loader";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const useStyles = makeStyles((theme) => ({
  // grid: {
  //   marginTop: "10vh",
  // },
  filterBox: {
    padding: 30,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  title: {
    marginTop: 100,
    fontFamily: "Roboto",
    borderBottom: "1px solid red",
    width: "20vmax",
    padding: "1vmax",
    margin: "5vmax auto",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    mobileFilterBtn: {
      marginTop: 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "80vw",
  },
}));

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 99000]);
  const [price2, setPrice2] = useState([0, 99000]); //to handle on changeCommited
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCategory = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const commitHandler = () => {
    setPrice2(price);
  };

  const ratingHandler = (e, newRating) => {
    setRating(newRating);
  };
  const ratingCommitHandler = () => {
    setRating2(rating);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const clearFilter = () => {
    setPrice2([0, 99000]);
    setRating2(0);
    setCurrentPage(1);
    setCategory("");
  };

  const { keyword } = useParams();
  const classes = useStyles();
  const alert = useAlert();
  const {
    loading,
    error,
    products,
    resultPerPage,
    productCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      return alert.error(error.message);
    }
    dispatch(getProduct(keyword, currentPage, price2, category, rating2));
    handleClose();
    setAnchorEl(null);
  }, [dispatch, error, alert, keyword, currentPage, price2, category, rating2]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />
          {/* Mobile Filter Box Start  */}
          <div className={classes.mobileFilterBtn}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button onClick={handleOpen}>Filters</Button>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Categories
              </Button>
              <Button onClick={clearFilter}>Clear Filters</Button>
            </ButtonGroup>
          </div>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  onChangeCommitted={commitHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={99000}
                />
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={rating}
                  onChange={ratingHandler}
                  onChangeCommitted={ratingCommitHandler}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </div>
            </Fade>
          </Modal>
          {/* Mobile Filter Box End  */}
          {/* Mobile Category Box Start  */}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseCategory}
          >
            {categories.map((category) => (
              <MenuItem onClick={() => setCategory(category)}>{category}</MenuItem>
            ))}
          </Menu>
          {/* Mobile Category Box End */}
          <Typography
            variant="h3"
            color="secondary"
            align="center"
            className={classes.title}
          >
            Products
          </Typography>
          <Grid className={classes.grid} container>
            <Grid item md={2}>
              <div className={classes.filterBox}>
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  onChangeCommitted={commitHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={99000}
                />
                <Typography>Categories</Typography>
                <ul className="categoryBox" />
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={rating}
                  onChange={ratingHandler}
                  onChangeCommitted={ratingCommitHandler}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={clearFilter}
                >
                  Clear Filters
                </Button>
              </div>
            </Grid>

            <Grid container className={classes.productBox} spacing={4} md={10}>
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              {filteredProductsCount < 1 && (
                <Grid item md={10}>
                  <Typography align="center" variant="h3">
                    No Products Found
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
