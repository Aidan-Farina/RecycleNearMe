import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER_BY_ID } from '../utils/queries';
import { AuthContext } from '../context/AuthContext'; // Import your AuthContext

const Profile = () => {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const userId = user?.id; // Get the user ID from the user object

  const { loading, error, data } = useQuery(QUERY_USER_BY_ID, {
    variables: { id: userId },
    fetchPolicy: "no-cache",
    skip: !userId, // Skip the query if userId is not available
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const userProfile = data?.getUserById || {};

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Your Profile</h1>
      </div>
      <div className="card-body m-5">
        <h2>Welcome, {userProfile.username}!</h2>
        <p>Email: {userProfile.email}</p>
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
