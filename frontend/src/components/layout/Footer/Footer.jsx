import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import LeftFooter from './LeftFooter';
import MidFooter from './MidFooter';
import RightFooter from './RightFooter';

const useStyles=makeStyles((theme)=>({
    root:{
        marginTop:'3rem',
        backgroundColor:'#f8f8f8'
    },
    bottonFooter:{
        backgroundColor:'#2f3640',
        display:'flex',
        justifyContent:"center",
        alignItems:'center',
        height:'4rem'
    }
}))


const Footer = () => {
  const classes=useStyles();
  return <div className={classes.root}>
    <Container style={{'padding':30}}>
        <Grid container >
            <LeftFooter/>
            <MidFooter />
            <RightFooter />
        </Grid>
    </Container>
    <div className={classes.bottonFooter}>
        <Typography variant="h6" style={{'color':'#fff'}} align='center'>&copy;{new Date().getFullYear()} All Rights Reserved by <span style={{color:"#f50057"}}>Akash Web Designs</span></Typography>
    </div>
             
  </div>;
};


export default Footer;
