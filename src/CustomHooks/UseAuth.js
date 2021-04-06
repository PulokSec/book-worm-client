import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';


export const initializeLoginFramework = () => {
  if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
  }
}

   export const googleSignIn = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const {displayName, photoURL, email} = result.user;
      const user = {
        isSignedIn: true,
        displayName: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return user;
        }).catch((error) => {
        });
    }
    export const fbSignIn = () => {
      const fbProvider = new firebase.auth.FacebookAuthProvider();
      return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
        var user = result.user;
        user.success = true;
        return user;
      }).catch(function(error) {
      });
    }
    export const createSignUp = (name,email, password) => {
     return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( res => {
        console.log(res);
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
      })
      .catch( error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
    }
    const updateUserName = name =>{
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: name
      }).then(function() {
        return name;
      }).catch(function(error) {
      });
    }
   export const signIn = (email, password) => {
     return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch(function(error) {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
    }
    export const signOut = () => {
     return firebase.auth().signOut().then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
        return signedOutUser;
      }).catch(err => {

      });
    }
  