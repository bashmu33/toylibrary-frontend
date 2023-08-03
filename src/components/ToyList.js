import React from 'react';
import ToyItem from './ToyItem';
import PropTypes from 'prop-types';

const ToyList = ({ toys, onReserveButtonClick, auth, setToys }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
            {toys.map((toy) => (
                <ToyItem
                    key={toy.toy_id}
                    toy={toy}
                    onReserveButtonClick={onReserveButtonClick}
                    auth={auth}
                    setToys={setToys}
                />
            ))}
        </div>
    );
};

    ToyList.propTypes = {
        toys: PropTypes.arrayOf(
        PropTypes.shape({
            toy_id: PropTypes.number.isRequired,
            toy_name: PropTypes.string.isRequired,
            description: PropTypes.string,
            age_category: PropTypes.string,
            toy_status: PropTypes.string.isRequired,
            })
        ).isRequired,
        onReserveButtonClick: PropTypes.func.isRequired, 
    };
    
    export default ToyList;