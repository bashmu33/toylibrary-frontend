import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import 'font-awesome/css/font-awesome.min.css';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates&family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
