import React, { useContext } from 'react';
import { UserContext } from '../../App';
// import { useAuth } from '../customHooks/useAuth';
import avatar from '../../images/avatar.svg'
const Profile = () => {
    const{loggedInUser} = useContext(UserContext);
    return (
        <div className="container my-5 py-5">
             <div className="card text-center col-md-8 mx-auto">
            <div className="card-header">
                My Profile
            </div>
            <div className="card-body py-5">
                {loggedInUser.photo ? <img src={loggedInUser.photo} width="100" alt="Profile Pic"/> :<img src={avatar} width="100" alt="Profile Pic"/>  }
                <h5 className="card-title pt-4">{loggedInUser.name}</h5>
                <hp className="card-text">{loggedInUser.email}</hp>
            </div>
        </div>
        </div>
       
    );
};

export default Profile;