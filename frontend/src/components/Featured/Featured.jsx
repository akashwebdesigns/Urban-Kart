import { Container, Button, Grid, Typography,Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';
import { useHistory } from 'react-router-dom';

const useStyles=makeStyles((theme)=>({
    root:{
        marginTop:'10px'
    },
    featured:{
        // marginBottom:'40px',
        color:'#34495e',
        fontFamily: 'Roboto',
        borderBottom: '1px solid red',
        width: '30vmax',
        padding: '1vmax',
        margin: '5vmax auto',
    },
    prod:{
        color:'#f50057'
    }
}))

const Featured = () => {

  const history=useHistory();
  let products=useSelector((state)=>state.products.products);
  products=products.slice(0,6);

  const classes=useStyles();
  return <div className={classes.root}>
      <Typography variant='h3'gutterBottom align='center' className={classes.featured}>Featured <span style={{color:"#f50057"}}>Products</span></Typography>
      <Container>
          <Grid container spacing={4}>
              {products.map((product)=>(
                    <Product key={product._id} product={product}  />
              ))}
          </Grid>
          <Box textAlign='center' margin={4}>
         <Button variant='outlined' onClick={()=>history.push("/products")} color='secondary' >View All Products</Button>
          </Box>
      </Container>
  </div>;
};


export default Featured;










