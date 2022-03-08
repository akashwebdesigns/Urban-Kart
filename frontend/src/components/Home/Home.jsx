import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import Featured from '../Featured/Featured';
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import {useAlert} from 'react-alert';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    background: {
        marginTop: '10vh',
        width: '100%',
        height: '90vh',
        backgroundImage: `url(https://images.unsplash.com/photo-1605086998852-18371cfd9b2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)`,
        backgroundSize: 'cover'
    },
    cont: {
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flexstart'
    },
    btn: {
        width: '8rem',
        marginTop: '20px',
    }
}))

const Home = () => {
    const history=useHistory();
    const alert = useAlert();
    const { loading, error } = useSelector((state => state.products))
    const dispatch = useDispatch();

    useEffect(() => {
        if(error){
            return alert.error(error.message)
        }
        dispatch(getProduct())
    }, [dispatch,error,alert])

    const classes = useStyles();

    return (
        <>
            {loading ? <Loader /> : <>
                <MetaData title='Urban Kart' />
                <div className={classes.background}>
                    <Container className={classes.cont}>
                        <Typography variant='h2' style={{ 'color': '#34495e' }}>
                            Urban <span style={{color:"#f50057"}}>Store</span>
                        </Typography>
                        <Typography variant="h2" style={{ 'color': '#34495e' }}>
                            For the Urban <span style={{color:"#f50057"}}>People</span>
                        </Typography>
                        <Button variant="contained" onClick={()=>history.push("/products")} size='medium' color="secondary" className={classes.btn}>Shop Now</Button>
                    </Container>
                </div>
                <Featured />
            </>}
        </>
    )
};

export default Home;
