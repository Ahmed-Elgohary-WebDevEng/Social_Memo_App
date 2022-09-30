import React, {useEffect, useState} from 'react';
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";

import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import useStyles from './NavbasrStyles'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/features/user/userSlice";
import decode from "jwt-decode"

function Navbar(props) {
   const styles = useStyles()
   // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   const user = JSON.parse(localStorage.getItem('profile'))
   const dispatch = useDispatch()
   const navigate = useNavigate()


   useEffect(() => {
      const token = user?.token

      if (token) {
         const decodedToken = decode(token)

         if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout()
         }
      }

      // JWT ..

      // setUser(JSON.parse(localStorage.getItem('profile')))
   }, [user]);

   function logoutHandler() {
      dispatch(logout())

      // Direct user to the auth page
      navigate('/auth')
   }

   //  *******************  JSX Code ********************
   return (
       <AppBar className={styles.appBar} position="static" color="inherit">
          <div className={styles.brandContainer}>
             <Link to="/">
                <img src={memoriesText} alt="icon" height="45px"/>
                <img className={styles.image} src={memoriesLogo} alt="memories" height="40"/>
             </Link>
          </div>
          <Toolbar className={styles.toolbar}>
             {user ? (
                 <div className={styles.profile}>
                    <Avatar className={styles.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={styles.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={styles.logout} color="secondary" onClick={logoutHandler}>Logout</Button>
                 </div>
             ) : (
                 <Link to="/auth">
                    <Button variant="contained" color="primary">Sign In</Button>
                 </Link>
             )}
          </Toolbar>
       </AppBar>
   );
}

export default Navbar;