import React from 'react';
import {Grid, Link, makeStyles, Typography} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const useStyles=makeStyles((theme)=>({

    root:{
        display:'flex',
        justifyContent:'center',
    },
    child:{
        marginTop:'2rem',
        display:'flex',
        flexDirection:'column',
        margin:'0 auto',
        [theme.breakpoints.down('sm')]:{
            margin:'2rem'
        }
    },
    childItem:{
        '&:hover': {
            color: "tomato",
            transition:'all 0.3s ease'
        },
        cursor:"pointer"

    },
    text:{
        color:'#34495e',
        fontWeight:'bold',
    },

}))

const MidFooter = () => {
  const history=useHistory();
  const classes=useStyles();
  return <Grid item sm={12} md={4}>
    <div className={classes.root}>
        <div className={classes.child}>
           <Typography variant='h5' gutterBottom className={classes.text} >Menu</Typography>
            <Link underline='none' onClick={()=>history.push("/")} color='textSecondary' gutterBottom className={classes.childItem}>Home</Link>
            <Link underline='none' onClick={()=>history.push("/about")} color='textSecondary' gutterBottom className={classes.childItem}>About</Link>
            <Link underline='none' onClick={()=>history.push("/products")} color='textSecondary' gutterBottom className={classes.childItem}>Products</Link>
            <Link underline='none' onClick={()=>history.push("/contact")} color='textSecondary' gutterBottom className={classes.childItem}>Contact</Link>
        </div>
        <div className={classes.child}>
            <Typography variant='h5' gutterBottom className={classes.text} >Account</Typography>
            <Link underline='none' onClick={()=>history.push("/account")} color='textSecondary' gutterBottom className={classes.childItem}>Account</Link>
            <Link underline='none' onClick={()=>history.push("/login")} color='textSecondary' gutterBottom className={classes.childItem}>Login</Link>
            <Link underline='none' onClick={()=>history.push("/login")} color='textSecondary' gutterBottom className={classes.childItem}>Register</Link>
            <Link underline='none' onClick={()=>history.push("/cart")} color='textSecondary' gutterBottom className={classes.childItem}>Cart</Link>
        </div>
    </div>
     
  </Grid>;
};

export default MidFooter;
