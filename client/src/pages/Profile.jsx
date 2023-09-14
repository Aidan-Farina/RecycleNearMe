import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER_BY_ID } from '../utils/queries';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { profile, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const userId = profile?.id;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login page if not logged in
    }
  }, [isLoggedIn, navigate]);

  const { loading, error, data } = useQuery(QUERY_USER_BY_ID, {
    variables: { id: userId },
    fetchPolicy: "no-cache",
    skip: !userId,
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
        <button className="btn btn-lg btn-primary m-2">View Saved Locations</button>
        <button className="btn btn-lg btn-secondary m-2">View My Reviews</button>
      </div>
    </div>
  );
};

export default Profile;
