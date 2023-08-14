import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import MainSection from './components/MainSection';
import ToyInventory from './pages/ToyInventory';
import AdminPortal from './pages/AdminPortal';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CheckOut from './pages/CheckOut';
import ProfilePage from './pages/ProfilePage';
import ManageUsers from './pages/ManageUsers';
import RegistrationPage from './pages/RegistrationPage'
import { JumbotronSection, DonationSection } from './components/MainSection';
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
            <Route path="/checkout" component={CheckOut} />
            <Route path="/manage-users" component={ManageUsers} />
            <Route path="/profile" component={ProfilePage} />
            <Route exact path="/">
              <MainSection handleToyInventoryClick={handleViewToyInventory} />
              <JumbotronSection />
              <DonationSection /> 
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
