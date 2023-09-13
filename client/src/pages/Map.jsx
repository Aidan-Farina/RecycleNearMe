import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapPage = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    // Fetch locations based on the query and update state
  }, [query]);

  return (
    <Map
      google={props.google}
      zoom={14}
      initialCenter={{ lat: 40.854885, lng: -88.081807 }}
    >
      {/* Add Marker components here based on fetched locations */}
      <Marker position={{ lat: 40.854885, lng: -88.081807 }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapPage);
