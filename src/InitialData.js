/*
import React from 'react';
import { List, Header } from 'semantic-ui-react';
export const Movies = ({ initialData }) => {
    return(
        <List>
        {initialData.map(initialData => {
            return (
            <List.Item key={initialData.title}>
            <Header>{initialData.title}</Header>
            </List.Item>
            );
        })}
        </List>
    );
};
*/
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './map.css';
import {
  MapContainer, TileLayer, Marker, Popup,
}
  from 'react-leaflet';
import { EventPage } from './EventContainer';

export function InitialData(props) {
  /* All these states and socket are
  passed as props to prevent cyclical
  import in EventContainer.js
  This file displays ALL the initial data */
  const {
    initialData,
    locations,
    clientId,
    socket,
    initialMapMarker,
  } = props;
  const [eventPage, setEventPage] = useState([]);
  const [showPage, setShowPage] = useState(false);
  // const i = 20;
  const n = '20';
  const n1 = '200';
  const n2 = '2000';
  const n3 = '20000';
  function renderPage(currEvent) {
    setShowPage(true);
    setEventPage(
      <div>
        <EventPage
          currEvent={currEvent}
          clientId={clientId}
          socket={socket}
        />
      </div>,
    );
  }
  if (!showPage) {
    return (
      <div className="container-fluid">
        <ul className="events">
          {initialData.map((currEvent) => (
            <li>
              <div key={currEvent.id + n} onClick={() => renderPage(currEvent)}>
                <img className="event_image" key={currEvent.id + n2} src={currEvent.images[0].url} alt="" width="300" height="200" />
                <h3 key={currEvent.id + n1} width="300">{currEvent.name}</h3>
                <p key={currEvent.id + n3}>{currEvent.dates.start.localDate}</p>
              </div>
            </li>
          ))}
        </ul>
        <div id="mapid">
          <MapContainer center={[initialMapMarker.lat, initialMapMarker.long]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((currLocation, idx) => (
              <Marker key={`marker-${idx * 2}`} position={[currLocation.lat, currLocation.long]}>
                <Popup>
                  {currLocation.name}
                  <br />
                  {currLocation.address}
                  ,
                  {currLocation.city}
                  ,
                  {currLocation.state}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    );
    //  eslint-disable-next-line
  }
  //  eslint-disable-next-line
  else{
    return eventPage;
  }
}
InitialData.propTypes = {
  initialData: PropTypes.arrayOf(PropTypes.object),
  locations: PropTypes.arrayOf(PropTypes.object),
  clientId: PropTypes.string,
  socket: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  initialMapMarker: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InitialData.defaultProps = {
  initialData: [],
  locations: [],
  clientId: null,
  socket: null,
  initialMapMarker: { lat: 51.00, long: -0.9 },
};

export default InitialData;
