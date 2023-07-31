import React from 'react';
import { withRouter } from 'react-router-dom';

const ButtonHolder = ({ loginClicked, history }) => {
  const displayLoginBox = () => {
    loginClicked();
  };

  const handleSignUpPageClick = () => {
    //navigates to the ToyInventory page
    history.push('/sign-up');
  };

  return (
    <div className="buttonholder">
      <button className="btn btn-secondary" onClick={displayLoginBox}>
        Login
      </button>
      <button className="btn btn-secondary" onClick={handleSignUpPageClick}>
        Sign Up
      </button>
    </div>
  );
};

export default withRouter(ButtonHolder);
