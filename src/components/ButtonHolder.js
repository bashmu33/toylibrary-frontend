import React from 'react';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { auth } from '../firebase'; 

const ButtonHolder = ({ history }) => {
  const { currentUser } = useAuth(); // U

  const handleLoginPageClick = () => {
    history.push('/login');
  };

  const handleSignUpPageClick = () => {
    history.push('/sign-up');
  };

  const handleLogoutClick = async () => {
    try {
      await auth.signOut(); //logs out the user
      history.push('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="buttonholder">
      {currentUser ? (
        //Logout button
        <button className="btn btn-secondary" onClick={handleLogoutClick}>
          Logout
        </button>
      ) : (
        //user is logged out, show Login and Sign Up buttons
        <>
          <button className="btn btn-secondary" onClick={handleLoginPageClick}>
            Login
          </button>
          <button className="btn btn-secondary" onClick={handleSignUpPageClick}>
            Sign Up
          </button>
        </>
      )}
    </div>
  );
};

export default withRouter(ButtonHolder);
