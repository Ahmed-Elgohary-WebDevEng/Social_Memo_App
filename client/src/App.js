import React, {useEffect} from "react";
import {Container} from "@material-ui/core";
import {
   BrowserRouter as Router, Navigate,
   Route,
   Routes
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home/HomePage";
import AuthPage from "./pages/Auth/AuthPage";
import {gapi} from "gapi-script";
import PostDetailsPage from "./pages/Post/PostDetailsPage";

const client_id = "613745803532-gu60dvdl3dljb7lpsq6apnr1ggo8l56m.apps.googleusercontent.com"
var GoogleAuth;
function App() {
   const user = JSON.parse(localStorage.getItem('profile'))

   const updateSigninStatus = true

   useEffect(() => {
      function initClient() {
         gapi.client.init({
            'clientId': client_id,
            'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
         }).then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();

            GoogleAuth.isSignedIn.listen(updateSigninStatus);
         })
      }
   });
   //  *******************  JSX Code ********************
   return (
       <Router>
          <Container maxWidth="xl">
             <Navbar/>
             {/* -------- Routers -------  */}
             <Routes>
                <Route path="/" exact element={<Navigate to="/posts" />} />
                {/* HomePage Page */}
                <Route path="/posts" exact element={<HomePage/>}/>
                {/* HomePage Search Page */}
                <Route path="/posts/search" exact element={<HomePage/>}/>
                {/* Past Page Details Page */}
                <Route path="/posts/:id" element={<PostDetailsPage />} />
                {/* HomePage Page */}
                <Route path="/auth" exact element={!user ? <AuthPage/> : <Navigate to="/posts" />}/>
             </Routes>
          </Container>
       </Router>
   );
}

export default App;
