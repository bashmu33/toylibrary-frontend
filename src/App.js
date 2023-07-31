import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import MainSection from './components/MainSection';
import ToyInventory from './pages/ToyInventory';
import LoginBox from './components/LoginBox';
import AdminPortal from './pages/AdminPortal';
import SignUpPage from './pages/SignUpPage';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // useHistory hook
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  const [displayLoginBox, setDisplayLoginBox] = useState(false);
  // const [userId, setUserId] = useState('');

  // const handleLoginSuccess = (userId) => {
  //   setUserId(userId);
  // };

  const handleLoginClick = () => {
    setDisplayLoginBox(true);
  };

  const hideLoginBox = () => {
    setDisplayLoginBox(false);
  };

  const history = useHistory(); // Creates history object

  const handleViewToyInventory = () => {
    // Navigate to the ToyInventory page
    history.push('/toy-inventory');
  };

  // const handleSignUpPageClick = () => {
  //   //navigates to the SignUp page
  //   history.push('/sign-up');
  // };

  return (
    <AuthProvider>
      <Router>
        <div className="holder">
          <Navigation loginClicked={handleLoginClick} />
          <Switch>
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/toy-inventory" component={ToyInventory} />
            <Route path="/admin-portal" component={AdminPortal} />
            <Route exact path="/">
              <MainSection handleToyInventoryClick={handleViewToyInventory} />
              {displayLoginBox && <LoginBox hideLoginBox={hideLoginBox} />}
              <Button variant="primary">
                <Link to="/admin-portal">Test Admin Portal</Link>
              </Button>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
