import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Home from '../pages/Home';
import Profil from '../pages/Profil';
import Trending from '../pages/Trending';
import Navbar from '../NavBar';

const index = () => (
    <Router>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profil" exact component={Profil} />
            <Route path="/trending" exact component={Trending} />
            <Redirect to="/" />
        </Switch>
    </Router>
);

export default index;