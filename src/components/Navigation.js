import React from 'react';
import ButtonHolder from './ButtonHolder';

const Navigation = ({ loginClicked }) => {

  return (
    <div className="topsection">
      <h1>FW•TOY•LIBRARY</h1>
      <h3>Playing•Sharing•Growing•Giving</h3>
      <ButtonHolder loginClicked={loginClicked} />
    </div>
  );
};

export default Navigation;
