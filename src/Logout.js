import React from 'react';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import './Login.css';

const clientId = 'YOUR_CLIENT_ID';
export function Logout(props) {
  const { toggleLogin, socket } = props;
  const handleLogout = () => {
    alert('Logout made successfully');
    socket.emit('Logout', { socketID: socket.id });
    toggleLogin();
  };
  return (
    <div className="GoogleAuth">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={handleLogout}
      />
    </div>
  );
}
Logout.propTypes = {
  toggleLogin: PropTypes.func,
  socket: PropTypes.instanceOf(io()),
};
Logout.defaultProps = {
  toggleLogin: () => {
    alert('default');
  },
  socket: null,
};
export default Logout;
