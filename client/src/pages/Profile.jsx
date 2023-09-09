import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_USER_PROFILE, {
    fetchPolicy: "no-cache"
  });

  const userProfile = data?.userProfile || {};

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Your Profile</h1>
      </div>
      <div className="card-body m-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h2>Welcome, {userProfile.username}!</h2>
            <p>Email: {userProfile.email}</p>
            <p>Member since: {new Date(userProfile.createdAt).toLocaleDateString()}</p>
          </>
        )}
      </div>
      <div className="card-footer text-center m-3">
        <h2>What would you like to do?</h2>
        <Link to="/saved-locations">
          <button className="btn btn-lg btn-primary m-2">View Saved Locations</button>
        </Link>
        <Link to="/my-reviews">
          <button className="btn btn-lg btn-secondary m-2">View My Reviews</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;