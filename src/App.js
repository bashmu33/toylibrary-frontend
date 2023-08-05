import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import MainSection from './components/MainSection';
import ToyInventory from './pages/ToyInventory';
import AdminPortal from './pages/AdminPortal';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // useHistory hook
import { AuthProvider } from './contexts/AuthContext';

const App = () => {

  const history = useHistory(); // Creates history object

  const handleViewToyInventory = () => {
    // Navigate to the ToyInventory page
    history.push('/toy-inventory');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="holder">
          <Navigation />
          <Switch>
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/register" component={RegistrationPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/toy-inventory" component={ToyInventory} />
            <Route path="/admin-portal" component={AdminPortal} />
            <Route exact path="/">
              <MainSection handleToyInventoryClick={handleViewToyInventory} />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
