import React from 'react';

const LocationList = ({ locations, onSelectLocation }) => {
    return ( <
        div className = "location-list" > {
            locations.map((loc, index) => ( <
                button key = { index }
                onClick = {
                    () => onSelectLocation(loc) } > { loc } <
                /button>
            ))
        } <
        /div>
    );
};

export default LocationList;