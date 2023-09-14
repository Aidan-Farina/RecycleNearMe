import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import the shared styles

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let autocomplete;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Google Places Autocomplete
      autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'));

      const onPlaceChanged = () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          // You can navigate to another route and pass the place details
          navigate(`/some-route`, { state: { place } });
        }
      };

      autocomplete.addListener('place_changed', onPlaceChanged);
    };

    return () => {
      // Remove the script element when the component unmounts
      document.body.removeChild(script);
    };
  }, [navigate]);

  const handleSearch = () => {
    // Perform the search and then navigate
    navigate('/some-route');
  };

  return (
    <div className="home-container" style={{ height: '100vh', backgroundColor: '#50C878', paddingTop: '50px' }}>
      <div className="container text-center" style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px' }}>
        <h1 className="header">Wondering where to recycle?</h1>
        <h2 className="header">Welcome to our community of eco-conscious individuals!</h2>
        <p className="paragraph">
          We're glad you're here. Use this platform to add, find, and review recycling locations.
        </p>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
