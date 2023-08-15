import React from 'react';
import ImageHolder from './ImageHolder';
import { withRouter } from 'react-router-dom';
import '../App.css'
import '../css/DonationSection.css'

const MainSection = ({ history }) => {
  const handleToyInventoryClick = () => {
    history.push('/toy-inventory');
  };

  const handleScrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('howItWorksSection');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSupportUs = () => {
    const supportUs = document.getElementById('supportUs');
    if (supportUs) {
      supportUs.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mainsection">
      <div className="leftsection">
        <h2>Joy of Toys</h2>
        <p>
          Welcome to our cherished toy library, a heartwarming haven for our community's young adventurers. Here, we believe in the magic of sharing, where laughter resonates in the playful patter of little feet and curious minds. Our toy library is more than just a place; it's a joyful gathering space, where children's dreams take flight and friendships are woven with imagination. Discover a treasure trove of toys that spark creativity, foster learning, and kindle the spirit of togetherness.
        </p>
        <div className="buttoncontainer">
          <button className="btn btn-danger" onClick={handleScrollToHowItWorks}>How it works</button>
          <button className="btn btn-danger" onClick={handleScrollToSupportUs}>Support Us</button>
          <button className="btn btn-danger full-width" onClick={handleToyInventoryClick}>
            View Toy Inventory
          </button>
        </div>
      </div>
      <div className="rightsection">
        <ImageHolder />
      </div>
    </div>
  );
};

const JumbotronSection = () => {
  const jumbotronStyle = {
    margin: '20px',
    border: '1px solid #ccc',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  };

  return (
    <div className="jumbotron jumbotron-fluid" style={jumbotronStyle}>
      <div className="container mt-5">
        <div className="how-it-works" id="howItWorksSection">
          <h3>How it Works</h3>
          <p className="lead">
            Our toy library offers a seamless experience for families to discover, play, and learn. With membership, you gain access to a world of imagination, where the joy of shared playtime knows no bounds.
          </p>
          <ul>
            <li>Members can check out up to four toys for four weeks, igniting endless adventures.</li>
            <li>Our online reservation system lets you secure your playtime treasures in advance, ensuring a personalized visit.</li>
            <li>At the library, children explore, learn, and play with carefully curated toys, fostering growth and cherished friendships.</li>
            <li>Each toy undergoes rigorous health and safety inspections, ensuring a secure and enriching playtime.</li>
            <li>Donations are warmly welcomed to support the growth of our beloved toy library and spread the joy of play.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


const DonationSection = () => {
  return (
    <div className="donation-section">
      <div className="donation-content" id="supportUs">
        <div className="donation-text">
          <h2>Support Us</h2>
          <p>Your generous contribution helps us make a difference!</p>
        </div>
        <button className="donate-button">Donate Now</button>
      </div>
    </div>
  );
};




export default withRouter(MainSection);
export { JumbotronSection };
export { DonationSection };
