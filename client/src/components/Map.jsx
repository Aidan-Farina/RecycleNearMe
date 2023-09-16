import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useQuery } from '@apollo/client';
import { QUERY_LOCATIONS } from '../utils/queries';

const Map = () => {
  const { loading, error, data } = useQuery(QUERY_LOCATIONS);

  useEffect(() => {
    if (!loading && !error) {
      const spots = data.locations;
      const mapboxApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

      mapboxgl.accessToken = mapboxApiKey;
      const map = new mapboxgl.Map({
        container: 'mapContainer',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9,
      });

      spots.forEach((spot) => {
        new mapboxgl.Marker()
          .setLngLat([spot.longitude, spot.latitude])
          .addTo(map);
      });
    }
  }, [loading, error, data]);

  return (
    <div id="mapContainer" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default Map;
