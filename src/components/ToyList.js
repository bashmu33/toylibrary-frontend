import React from 'react';
import ToyItem from './ToyItem';

const ToyList = ({ toys, onHoldButtonClick }) => {
    return (
        <div>
            {toys.map((toy) => (
                <ToyItem
                    key={toy.id}
                    toy={toy}
                    onHoldButtonClick={onHoldButtonClick}
                />
            ))}
        </div>
    );
};

export default ToyList;