import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries, deleteLogEntry } from './api';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import { ReactComponent as Pin } from './pin.svg';
import LogEntryForm from './LogEntryForm';

export default () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [location, setLocation] = useState(null);
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
  }, [viewport]);

  const handleMapDblClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    setLocation({
      longitude,
      latitude,
    });
  };

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
      doubleClickZoom={false}
      onClick={() => setShowPopup({})}
      onDblClick={handleMapDblClick}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <Pin
              style={{
                transform: 'translate(-50%, -100%)',
              }}
              width="24px"
              fill="#99c793"
              onClick={() => setShowPopup({ [entry._id]: true })}
            />
          </Marker>
          {showPopup[entry._id] && (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div style={{ maxWidth: '320px' }}>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited:
                  {new Date(entry.visitDate).toLocaleDateString()}
                </small>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const status = await deleteLogEntry(entry._id);
                  if (status.ok) {
                    setLogEntries(
                      logEntries.filter(
                        (logEntry) => logEntry._id !== entry._id,
                      ),
                    );
                  }
                }}
              >
                🗑
              </button>
            </Popup>
          )}
        </React.Fragment>
      ))}
      {location && (
        <Popup
          latitude={location.latitude}
          longitude={location.longitude}
          closeOnClick={false}
          onClose={() => setLocation(null)}
          anchor="top"
        >
          <LogEntryForm
            location={location}
            onSubmit={(newEntry) => {
              setLocation(null);
              setLogEntries([...logEntries, newEntry]);
              setShowPopup({ [newEntry._id]: true });
            }}
          />
        </Popup>
      )}
    </ReactMapGL>
  );
};
