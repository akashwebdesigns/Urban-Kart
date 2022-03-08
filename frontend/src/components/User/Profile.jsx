import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../Loader";
import { Link,useHistory } from "react-router-dom";
import "./Profile.css";
import {Avatar, Typography} from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";


const useStyles=makeStyles((theme)=>({

    size:{
      width: theme.spacing(30),
      height: theme.spacing(30),
      [theme.breakpoints.down("md")]:{
        width: theme.spacing(17),
        height: theme.spacing(17),
      }
    }
}))

const Profile = () => {
 
const classes=useStyles();

  const history=useHistory();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <Typography variant="h5" gutterBottom align='center' color="initial">My Profile</Typography>
              {/* <img src={user.avatar.url} alt={user.name} /> */}
              <Avatar className={classes.size} alt="Remy Sharp" src={user.avatar.url} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).slice(0, 10)}</p>
              </div>

              <div className="buttons">
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;