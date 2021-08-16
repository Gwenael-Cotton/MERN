import React from 'react';
import PropTypes from 'prop-types';

import Log from './Log';

const Profil = () => (
  <div className="profile-page">
    <div className="login-container">
      <Log signin={false} signup={true} />
      {/*<div className="img-container">
        <img src="" alt="image login" />
      </div>*/}
    </div>
  </div>
);

Profil.propTypes = {};
export default Profil;
