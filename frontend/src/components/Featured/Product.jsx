import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    border:'none'
  },
  media: {
    height: 245,
  },
  img:{
    width: '14vmax',
    marginLeft:38,
    marginTop:6
  },
  btn:{
    display:'flex',
    justifyContent:'center',
  }
});

export default function Product({product}) {
  const classes = useStyles();
  const history=useHistory();
  return (
    <Grid item xs={6} sm={3} md={4}>
      <Card variant='outlined' className={classes.root}>
        <CardActionArea  onClick={()=>history.push(`/product/${product._id}`)} >
          <img className={classes.img} src={product.images[0].url} alt="" />
          <CardContent>
            <Typography variant="h5" align='center'>
              {product.name}
            </Typography>
            <Typography variant='h6' align='center' color='secondary'>₹{product.price}</Typography>
            <Typography align='center'>
            <Rating name="half-rating" defaultValue={Number(product.rating)} precision={0.5} readOnly />
            </Typography>
            <Typography variant='subtitle2' align='center' >({product.numOfReviews} Reviews)</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
