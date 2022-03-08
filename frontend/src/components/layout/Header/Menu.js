import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from 'react-router-dom';
import {useAlert} from 'react-alert';
import {useSelector,useDispatch} from 'react-redux'
import { logout } from "../../../actions/userAction";



const StyledMenu = withStyles({
  paper: {
    backgroundColor:'#f50057',
    marginTop:5
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color:'white',
      },
  },
}))(MenuItem);







export default function CustomizedMenus() {
  const dispatch=useDispatch();
  const {user}= useSelector((state)=>state.user)
  const alert=useAlert();  
  const history=useHistory();  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const orders=()=>{
      history.push("/orders");
  }
  const account=()=>{
    history.push("/account");
  }
  const logoutUser=()=>{
    dispatch(logout());
    alert.success("Logout Successfully");
    history.push("/products")
  }
  const dashboard=()=> {
    history.push("/admin/dashboard");
  }

    const options = [
    { icon: <ListAltIcon fontSize='small' />, name: "Orders", func: orders },
    { icon: <PersonIcon fontSize='small' />, name: "Profile", func: account },
    { icon: <ExitToAppIcon fontSize='small' />, name: "Logout", func: logoutUser },
  ];

  if(user.role==="admin"){
    options.unshift(
    { icon: <DashboardIcon fontSize='small' />, name: "Dashboard", func: dashboard },
    )
  }
  const [name]=user.name.split(" ");
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="secondary"
        onClick={handleClick}
        startIcon={<AccountCircleIcon />}
      >
        {name}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option)=>(
            <StyledMenuItem key={option.name} onClick={option.func}>
              <ListItemIcon>
                {option.icon}
              </ListItemIcon>
            <ListItemText primary={option.name} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
