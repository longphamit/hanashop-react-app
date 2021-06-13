import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AdminHeader = () => {
  const classes = useStyles();
  const history = useHistory()
  const loginButton = () => {
    history.replace("/admin/login")
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        
         <ListItem button  onClick={()=>{history.push("/admin")}}>
            <ListItemText primary="DashBoard" />
          </ListItem>
          <ListItem button onClick={()=>{history.push("/admin/user")}}>
            <ListItemText  primary="User Manage" />
          </ListItem>
          <ListItem button  onClick={()=>{history.push("/admin/product")}}>
            <ListItemText primary="Product Manage" />
          </ListItem>
          <ListItem button  onClick={()=>{history.push("/admin")}}>
            <ListItemText primary="Category Manage" />
          </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div>
      <div>
        <AppBar position="static">
          <Toolbar>
            <React.Fragment>
              <IconButton
                onClick={toggleDrawer("left", true)}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
              >
                {list("left")}
              </SwipeableDrawer>
            </React.Fragment>

            <Typography onClick={() => history.replace("/admin")} variant="h6" className={classes.title}>
              Dash board
            </Typography>
                <Button onClick={()=>loginButton()} variant="contained" color="secondary" >Login</Button>       
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};
export default AdminHeader