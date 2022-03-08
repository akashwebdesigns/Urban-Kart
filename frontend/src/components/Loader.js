import React from 'react';
import {CircularProgress} from '@material-ui/core'

const loader = () => {
  return <div style={{height:'100vh',display: 'flex', justifyContent: 'center', alignItems:'center'}}>
        <CircularProgress color='secondary' size={80}/>
</div>;
};

export default loader;
