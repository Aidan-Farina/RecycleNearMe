import React, { useEffect, useState } from 'react';
import Map from '../components/Map'; // Import the Map component

const AddLocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleMapClick = (e) => {
    setCoordinates({ lat: e.lngLat.lat, lng: e.lngLat.lng });
  };

  const handleSubmit = () => {
    console.log('Sending to database:', { coordinates, title, description });
  };

  return (
    <div>
      <Map onClick={handleMapClick} />
      {coordinates && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit}>Add Location</button>
        </div>
      )}
    </div>
  );
};

export default AddLocation;
