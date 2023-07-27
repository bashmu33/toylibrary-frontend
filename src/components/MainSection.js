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
        <h2>Subheading</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse deserunt officia reprehenderit quas impedit
          aspernatur facilis minus. Adipisci minima rem, ducimus veniam, id fugiat nihil asperiores sapiente voluptates,
          veritatis perspiciatis.
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
        <SearchBar />
        <ImageHolder />
      </div>
    </div>
  );
};

//withrouter allows history access
export default withRouter(MainSection);
