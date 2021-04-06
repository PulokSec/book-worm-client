import React, { useCallback, useContext, useState } from 'react';
import {  useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { fbSignIn, googleSignIn,initializeLoginFramework,signIn, createSignUp } from '../../CustomHooks/UseAuth';
import image from '../../images/bg3.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle,faFacebook} from '@fortawesome/free-brands-svg-icons'
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const [newUser, setNewUser] = useState(true);
  const [user, setUser] = useState({
    isSignedIn: false,
    displayName: '',
    email: '',
    password: '',
    photo: ''
  });
  const { register, watch,handleSubmit, errors } = useForm();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  initializeLoginFramework();
  const {setLoggedInUser } = useContext(UserContext);
  
  const handleGoogleSignIn = () => {
      googleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const handleFbSignIn = () => {
      fbSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const handleResponse = useCallback((res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  },[from,history,setLoggedInUser])
  const submitForm = useCallback(
    async data => {
      if(newUser === true){
        const {name,email,password} = data;
        createSignUp(name, email, password)
            .then(res => {
              handleResponse(res, true);
            })
      }
      else{
        const {email,password} = data;
        signIn(email, password)
       .then(res => {
        handleResponse(res, true);
      })
      }
    },[handleResponse,newUser])

  return (
    <div className="container">

      <div className="row align-items-center" style={{ height: '100vh' }}>

      <div className="col-md-7 pe-5">
        <img src={image} className="img-fluid w-100" alt="Authentication" />
       </div>

      <div className="col-md-5">

      <h3 className="text-center mb-2">{newUser ?'Create an account'  : 'Login'}</h3>

      <form className="form my-2" onSubmit={handleSubmit(submitForm)}>
      {newUser && <div className="mb-3 form-group">
       <input name="name" ref={register({ required: true })} type="text" placeholder="Name" className="form-control"/>
       {errors.name && <span className="error">Name is required</span>}
      </div>}

       <div className="mb-2 form-group">
        <input name="email" ref={register({ required: true })} type="email" placeholder="Email" className="form-control"/>
        </div>

       <div className="mb-2 form-group">
        <input name="password" ref={register({ required: true })} type="password" placeholder="Password" className="form-control" required/>
        {errors.password && <span className="error">Password is required</span>}
        </div>

         {newUser && <div className="mb-2 form-group">
         <input name="confirm_password" ref={register({validate: value => value === watch('password'),
          })} type="password" placeholder="Confirm Password" className="form-control"/>
          {errors.confirm_password && <span className="error">Passwords didn't match.</span>}
          </div>}

         <div className="mb-2 form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label">Remember me</label>
        </div>

        <div className="mb-2 d-grid form-group">
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign in'} className="btn btn-primary"/>

        <p className="text-center"><input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/> Already have an account? </p>

        <p className="text-center">Or,</p>

         </div>
        </form>

        <button type="button" onClick={handleGoogleSignIn}  className="btn btn-danger mb-1 w-100 rounded-pill"><FontAwesomeIcon icon={faGoogle}/> Continue with Google</button>
            <br/>

            <button type="button" onClick={handleFbSignIn}  className="btn btn-primary w-100 rounded-pill"><FontAwesomeIcon icon={faFacebook}/> Continue with Facebook</button>
       </div>
    </div>
    </div>
  );
};

export default SignUp;