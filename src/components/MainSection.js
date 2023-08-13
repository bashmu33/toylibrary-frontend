import React from 'react';
import ImageHolder from './ImageHolder';
import SearchBar from './SearchBar';
import { withRouter } from 'react-router-dom';

const MainSection = ({ history }) => {
  const handleToyInventoryClick = () => {
    //navigates to the ToyInventory page
    history.push('/toy-inventory');
  };

  return (
    <div className="mainsection">
      <div className="leftsection">
        <h2>Joy of Toys</h2>
        <p>
        Welcome to our cherished toy library, a heartwarming haven for our community's young adventurers. Here, we believe in the magic of sharing, where laughter resonates in the playful patter of little feet and curious minds. Our toy library is more than just a place; it's a joyful gathering space, where children's dreams take flight and friendships are woven with imagination. Discover a treasure trove of toys that spark creativity, foster learning, and kindle the spirit of togetherness.
        </p>
        <div className="buttoncontainer">
          <button className="btn btn-danger">How it works</button>
          <button className="btn btn-danger">Support Us</button>
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

//withrouter allows history access
export default withRouter(MainSection);
