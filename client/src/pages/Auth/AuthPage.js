import React, { useState } from 'react';

import useStyles from "./AuthStyles"
import { Avatar, Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import Input from "../../components/Form/Input/Input";
import GoogleLogin from "react-google-login";
import Icon from "../../components/Form/Input/Icon";
import { useDispatch } from "react-redux";
import { auth } from "../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../redux/features/user/thunks/userThunk";


function AuthPage(props) {
   // const { signIn, loaded } = useGoogleLogin({})
   const styles = useStyles()
   const [showPassword, setShowPassword] = useState(false);
   const [isSignup, setIsSignup] = useState(false);
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: 'ahmed@gmail.com',
      password: '',
      confirmPassword: ''
   });
   const dispatch = useDispatch()
   const navigate = useNavigate()


   function handleShowPassword() {
      setShowPassword(prevShowPassword => !prevShowPassword)
   }

   function handleChange(event) {
      setFormData({ ...formData, [event.target.name]: event.target.value })
   }

   function switchMode() {
      setIsSignup(prevIsSignup => !prevIsSignup)
      handleShowPassword(false)
   }

   async function googleSuccess(response) {
      const result = response?.profileObj
      const token = response.tokenId

      try {
         // Dispatch user Action
         dispatch(auth({ result, token }))

         // Navigate user to the home page
         navigate('/')
      } catch (error) {
         console.log(error)
      }
   }

   function googleFailure(error) {
      console.log(error)
      console.log("Google Sign in failed. Try Again Later!")
   }

   function handleSubmit(event) {
      event.preventDefault()

      // console.log(formData)
      if (isSignup) {
         // Dispatch action Signup
         dispatch(signUp({formData, navigate}))
      } else {
         // Dispatch action SignIn
         dispatch(signIn({formData, navigate}))
      }
   }

   return (
       <Container component="main" maxWidth="xs">
          <Paper className={ styles.paper } elevation={ 3 }>
             <Avatar className={ styles.avatar }>
                <LockOutlined/>
             </Avatar>
             <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
             <form className={ styles.form } onSubmit={ handleSubmit }>
                <Grid container spacing={ 2 }>
                   { isSignup && (
                       <>
                          <Input name="firstName" label="First Name" handleChange={ handleChange } autoFocus half/>
                          <Input name="lastName" label="Last Name" handleChange={ handleChange } half/>
                       </>
                   ) }
                   <Input name="email" label="Email Address" handleChange={ handleChange } type="email"/>
                   <Input name="password" label="Password" handleChange={ handleChange } type={ showPassword ? 'text' : 'password' } handleShowPassword={ handleShowPassword }/>
                   { isSignup &&
                       <Input name="confirmPassword" label="Repeat Password" handleChange={ handleChange } type="password"/> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={ styles.submit }>
                   { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin
                    clientId="613745803532-gu60dvdl3dljb7lpsq6apnr1ggo8l56m.apps.googleusercontent.com"
                    render={ (renderProps) => (
                        <Button className={ styles.googleButton } color="secondary" fullWidth onClick={ renderProps.onClick } disabled={ renderProps.disabled } startIcon={
                           <Icon/> } variant="contained">
                           Google Sign In
                        </Button>
                    ) }
                    buttonText="Login"
                    onSuccess={ googleSuccess }
                    onFailure={ googleFailure }
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify="flex-end">
                   <Grid item>
                      <Button onClick={ switchMode }>
                         { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                      </Button>
                   </Grid>
                </Grid>
             </form>
          </Paper>
       </Container>
   );
}

export default AuthPage;