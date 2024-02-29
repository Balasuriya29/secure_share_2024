import React, { useState, useEffect } from 'react';

const Test = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if ('geolocation' in navigator) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>{error || 'Getting location...'}</p>
      )}
    </div>
  );
};

export default Test;
