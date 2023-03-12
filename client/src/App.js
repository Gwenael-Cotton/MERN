import React, { useState, useEffect } from 'react';
import Routes from './components/Routes';
import { UidContext } from './components/AppContext';
import axios from 'axios';

import './App.css';

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log(err))
    }
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
