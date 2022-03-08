import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Footerlogo from '../Footer/banner.png'
import {useHistory} from 'react-router-dom';

const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    child:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    img:{
        width:'15rem',
        marginBottom:'15px',
        cursor:"pointer",
        [theme.breakpoints.down("md")]:{
            width:'10rem'
        }
    },
    text:{
        color:'#34495e',
        fontWeight:'bold',
        [theme.breakpoints.down("md")]:{
            display:'none'
        }
    },
}))

const LeftFooter = () => {
    const history=useHistory();
    const classes=useStyles();
  return <Grid item xs={12} md={4}>
         <div className={classes.root}>
             <div className={classes.child}>
                <img src={Footerlogo} alt="" className={classes.img} onClick={()=>history.push("/")} />
                <Typography variant='subtitle1' align='center' gutterBottom className={classes.text}>28 White tower, Los Santos, New York City, USA</Typography>
                <Typography variant='subtitle1' align='center' gutterBottom className={classes.text}>+91 7007797987</Typography>
                <Typography variant='subtitle1' align='center' gutterBottom className={classes.text}>akash.gupta33@outlook.com</Typography>
             </div>
          </div>
  </Grid>;
};

export default LeftFooter;
