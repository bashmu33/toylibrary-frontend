import React, { useState } from 'react';
import Navigation from './components/Navigation';
import MainSection from './components/MainSection';
import BecomeMember from './pages/BecomeMember';
import ToyInventory from './pages/ToyInventory';
import LoginBox from './components/LoginBox';
import AdminPortal from './pages/AdminPortal';
import { Button } from 'react-bootstrap';


const App = () => {
  const [displayPage, setDisplayPage] = useState(null);
  const [displayLoginBox, setDisplayLoginBox] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (userId) => {
    setUserId(userId);
  };

  const handleBecomeMemberClick = () => {
    setDisplayPage('becomeMember');
  };

  const handleToyInventoryClick = () => {
    setDisplayPage('toyInventory');
  };

  const handleLoginClick = () => {
    setDisplayLoginBox(true);
  };

  const hideLoginBox = () => {
    setDisplayLoginBox(false);
  };

  const handleAdminPortalClick = () => {
    setDisplayPage('adminPortal');
  };

  const renderPage = () => {
    if (displayPage === 'becomeMember') {
      return <BecomeMember />;
    } else if (displayPage === 'toyInventory') {
      return <ToyInventory userId={userId} />;
    } else if (displayPage === 'adminPortal') {
      return <AdminPortal />;
    } else {
      return (
        <>
          <Navigation loginClicked={handleLoginClick} becomeMemberClicked={handleBecomeMemberClick} onLoginSuccess={handleLoginSuccess}  />
          <MainSection handleToyInventoryClick={handleToyInventoryClick} />
          {displayLoginBox && <LoginBox hideLoginBox={hideLoginBox} />}
          <Button variant="primary" onClick={handleAdminPortalClick}>
          Test Admin Portal
          </Button>
        </>
      );
    }
  };

  return <div className="holder">{renderPage()}</div>;
};

  export default App;
