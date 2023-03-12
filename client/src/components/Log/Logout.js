import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import cookie from "js-cookie";

const Logout = () => {

    const removeCookie = (key) => {
        if (window !== undefined) {
            cookie.remove(key, {expire: 1});
        }
    }

    const logout = async () => {
    await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}api/user/logout`,
        withCredentials: true,
        data: {}
    }).then(() => {
        removeCookie("jwt")
    }).catch((err) => {
        console.log(err);
    });

    window.location = "/";
};
    return (
        <li onClick={logout}>
            Déconnexion
        </li>
    );
};

Logout.propTypes = {};
export default Logout;
