import React, { useEffect, useState } from 'react';

const AddLocation = () => {
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const mapObj = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      setMap(mapObj);

      mapObj.addListener('click', (e) => {
        setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });
    };
  }, []);

  const handleSubmit = () => {
    // Send coordinates, title, and description to your database
    console.log('Sending to database:', { coordinates, title, description });
  };

  return (
    <div>
      <div id="map" style={{ height: '400px', width: '600px' }}></div>
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
