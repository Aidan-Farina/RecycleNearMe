import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
            <button className="btn btn-primary" onClick={() => navigate(`/some-route`, { state: { searchTerm } })}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
