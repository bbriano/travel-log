import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { listLogEntries } from './api';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import { ReactComponent as Pin } from './pin.svg';

export default () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerWidth,
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  useEffect(() => {
    (async () => {
      const newLogEntries = await listLogEntries();
      setLogEntries(newLogEntries);
    })();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setViewport({
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  return (
    <ReactMapGL
      width={viewport.width}
      height={viewport.height}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/mapbox/dark-v10"
    >
      {logEntries.map((entry) => (
        <Marker
          key={entry._id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-12}
          offsetTop={-24}
        >
          <Pin width="24px" fill="#99c793" />
          <span style={{ color: '#888' }}>{entry.title}</span>
        </Marker>
      ))}
    </ReactMapGL>
  );
};
