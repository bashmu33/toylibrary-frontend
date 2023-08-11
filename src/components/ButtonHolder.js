import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';

const ButtonHolder = ({ history }) => {
  const { currentUser, isAdmin } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (currentUser) {
        const adminStatus = await isAdmin();
        setIsAdminUser(adminStatus);
      }
    };

    checkAdminStatus();
  }, [currentUser, isAdmin]);

  const handleLoginPageClick = () => {
    history.push('/login');
  };

  const handleSignUpPageClick = () => {
    history.push('/sign-up');
  };

  const handleAdminPortalClick = () => {
    history.push('/admin-portal');
  };

  const handleLogoutClick = async () => {
    try {
      await auth.signOut();
      history.push('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleProfilePageClick = () => {
    history.push('/profile'); 
  };

  return (
    <div className="buttonholder">
      {currentUser && (
        <>
          {isAdminUser && (
            <button className="btn btn-primary mr-2" onClick={handleAdminPortalClick}>
              Admin Portal
            </button>
          )}
          {!isAdminUser && (
            <button className="btn btn-primary mr-2" onClick={handleProfilePageClick}>
              Profile
            </button>
          )}
          <button className="btn btn-secondary" onClick={handleLogoutClick}>
            Logout
          </button>
        </>
      )}
      {!currentUser && (
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
