import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ onClick }) => {
  useEffect(() => {
    const mapboxApiKey = import.meta.env.VITE_MAPBOX_API_KEY;
    mapboxgl.accessToken = mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    map.on('click', onClick);

    return () => {
      map.remove();
    };
  }, [onClick]);

  return (
    <div id="mapContainer" style={{ width: '100%', height: '400px' }}></div>
  );
};


export default Map;
