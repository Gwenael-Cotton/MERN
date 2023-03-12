import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UidContext } from '../AppContext';

import Log from '../Log';

const Profil = () => {
  const uid = useContext(UidContext);

  return (
  <div className="profile-page">
  {uid ? (
    <h1>Update page</h1>
  ) : (
    <div className="login-container">
      <Log signin={false} signup={true} />
      {/*<div className="img-container">
        <img src="" alt="image login" />
      </div>*/}
    </div>
    )}
  </div>
  )
};

Profil.propTypes = {};
export default Profil;
