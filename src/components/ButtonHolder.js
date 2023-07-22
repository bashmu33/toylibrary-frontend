import React from 'react';

const ButtonHolder = ({ loginClicked, becomeMemberClicked }) => {
  const displayLoginBox = () => {
    loginClicked();
  };

  const displayBecomeMember = () => {
    becomeMemberClicked();
  };

  return (
    <div className="buttonholder">
      <button className="btn btn-secondary" onClick={displayLoginBox}>
        Login
      </button>
      <button className="btn btn-secondary" onClick={displayBecomeMember}>
        Become a Member
      </button>
    </div>
  );
};

export default ButtonHolder;
