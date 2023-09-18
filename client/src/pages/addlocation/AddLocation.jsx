import React, { useEffect, useState } from 'react';
import Map from '../../components/Map';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_LOCATION } from '../../utils/mutations';
import mapboxgl from 'mapbox-gl';
import { GET_TAGS } from '../../utils/queries';
import './Addlocation.css';

const AddLocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [addLocation] = useMutation(ADD_LOCATION);
  const { loading, error, data } = useQuery(GET_TAGS);
console.log(data);
  const handleTagChange = (tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const handleSearch = (address) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => {
        const [longitude, latitude] = data.features[0].center;
      });
  };

  const handleMapClick = (e) => {
    setCoordinates({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    console.log(e.lngLat.lat, e.lngLat.lng);
  };

  const handleSubmit = () => {
    addLocation({
      variables: {
        name: title,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        tags: selectedTags,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for a location"
        onChange={(e) => handleSearch(e.target.value)}
        className="input"
      />
      <Map onClick={handleMapClick} />
      {coordinates && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <select multiple onChange={(e) => handleTagChange(e.target.value)} className="select">
            {data.getTags.map((tag) => (
              <option key={tag._id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          ></textarea>
          <button onClick={handleSubmit} className="button">Add Location</button>
        </div>
      )}
    </div>
  );
};

export default AddLocation;
