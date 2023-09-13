import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="container-fluid" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <div className="card" style={{ width: '80%', backgroundColor: '#FFFFFF', borderColor: '#333333' }}>
        <div className="text-center" style={{ color: '#333333' }}>
          <h1>Wondering where to recycle?</h1>
        </div>
        <div className="card-body text-center" style={{ color: '#333333' }}>
          <h2>Welcome to our community of eco-conscious individuals!</h2>
          <p>We're glad you're here. Use this platform to add, find, and review recycling locations.</p>
        </div>
        <div className="card-footer text-center" style={{ backgroundColor: '#50C878', color: '#FFFFFF' }}>
          <h2>Ready to find a recycling location?</h2>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-lg" style={{ backgroundColor: '#333333', color: '#FFFFFF' }} onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

