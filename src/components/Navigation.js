import React from 'react';
import ButtonHolder from './ButtonHolder';

const Navigation = ({ loginClicked, becomeMemberClicked }) => {
  return (
    <div className="topsection">
      <h1>FW•TOY•LIBRARY</h1>
      <h3>Playing•Sharing•Growing•Giving</h3>
      <ButtonHolder loginClicked={loginClicked} becomeMemberClicked={becomeMemberClicked} />
    </div>
  );
};

export default Navigation;
