import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
     } from 'react-router-dom';

import Home from '../Home';
import Profil from '../Profil';
import Trending from '../Trending';

const index = () => (
  <Router>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/trending" exact component={Trending} />
          <Redirect to="/" />
      </Switch>
  </Router>
);

export default index;