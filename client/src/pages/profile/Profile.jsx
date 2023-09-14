import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER_BY_ID } from '../../utils/queries';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const userId = currentUser?.authenticatedPerson?._id;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/'); // Redirect to the login page if not logged in
    }
  }, [isLoggedIn, navigate]);

  const { loading, error, data } = useQuery(QUERY_USER_BY_ID, {
    variables: { getUserId: userId },
    fetchPolicy: 'no-cache',
    skip: !userId,
  });

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const userProfile = data?.getUser || {};

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="header">Your Profile</h1>
      </div>
      <div className="profile-body">
        <h2 className="header">Welcome, {userProfile.username}!</h2>
        <p className="paragraph">Email: {userProfile.email}</p>
      </div>
      <div className="profile-footer">
        <h2 className="header">What would you like to do?</h2>
        <button className="btn btn-primary">View Saved Locations</button>
        <button className="btn btn-secondary">View My Reviews</button>
      </div>
    </div>
  );
};

export default Profile;
