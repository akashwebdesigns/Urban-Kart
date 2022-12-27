import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import PlayStore from './playStore.png'

const useStyles=makeStyles((theme)=>({
    img:{
        width:'16rem',
        height:'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        cursor:"pointer",
        [theme.breakpoints.down('sm')]:{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
        }
    }
}))


const RightFooter = () => {

    const classes=useStyles();
    return <Grid item sm={12} md={4}>
        {/* <div> */}
            <img src={PlayStore} alt="" className={classes.img} />
        {/* </div> */}
        
      </Grid>
};

export default RightFooter;
