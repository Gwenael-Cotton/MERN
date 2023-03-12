import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UidContext } from './AppContext';
import SignInForm from '../components/Log/SignInForm';
import Logout from '../components/Log/Logout';

const NavBar = () => {
    const uid = useContext(UidContext);

    return (
        <header>
            <div className="logo">
                <NavLink exact to="/">
                    <h3>FacePlook</h3>
                </NavLink>
            </div>
            {uid ? (
                <ul>
                <NavLink exact to="/profil">
                    <li>
                            <h5>Bienvenue "name"</h5>
                    </li>
                    <Logout />
                </NavLink>
                </ul>
            ) : (
                <ul>
                    <li>
                        <h5>Bienvenue</h5>
                    </li>
                    <li>
                        <NavLink exact to="/profil">
                            <h5>Connexion</h5>
                        </NavLink>
                    </li>
                </ul>
            )}
        </header>
    );
};

NavBar.propTypes = {};
export default NavBar;
