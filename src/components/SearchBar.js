import React from 'react';
import '../App.css'

const SearchBar = () => {
    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" style={{ width: '400px', height: '30px' }} placeholder="Search toy inventory..." />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Go!</button>
                    </span>
                </div>
            </div>
        </div>  
    );
};
export default SearchBar;

