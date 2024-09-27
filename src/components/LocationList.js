import React from 'react';

const LocationList = ({ locations, onSelectLocation }) => {
  return (
    <div>
      <h3>Saved Locations</h3>
      <ul>
        {locations.map((loc, index) => (
          <li key={index} onClick={() => onSelectLocation(loc)}>
            {loc}
          </li>
        ))}
      </ul>+
    </div>
  );
};

export default LocationList;
