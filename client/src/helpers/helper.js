import {gapi} from "gapi-script";

const client_id = "613745803532-gu60dvdl3dljb7lpsq6apnr1ggo8l56m.apps.googleusercontent.com"
var GoogleAuth;
const updateSigninStatus = true

export const initClientGoogleSignIn = () => {
   gapi.client.init({
      'clientId': client_id,
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
   }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      GoogleAuth.isSignedIn.listen(updateSigninStatus);
   })

   return GoogleAuth.signIn()
}

