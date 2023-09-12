import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container-fluid" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <div className="card" style={{ width: '80%', backgroundColor: '#FFFFFF', borderColor: '#333333' }}>
        <div className="text-center" style={{ color: '#333333' }}>
          <h1>Wondering where to recycle?</h1>
        </div>
        <div className="card-body text-center" style={{ color: '#333333' }}>
          <h2>Welcome to our community of eco-conscious individuals!</h2>
          <p>We're glad you're here. Use this platform to find and review recycling locations.</p>
        </div>
        <div className="card-footer text-center" style={{ backgroundColor: '#50C878', color: '#FFFFFF' }}>
          <h2>Ready to review a recycling location or view your profile?</h2>
          <Link to="/profile">
            <button className="btn btn-lg" style={{ backgroundColor: '#333333', color: '#FFFFFF' }}>Go to Profile!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
