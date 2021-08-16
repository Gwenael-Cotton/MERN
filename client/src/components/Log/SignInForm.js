import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SignInForm = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = (event) => {
    event.preventDefault();
    const infosError = document.querySelector('.error');

    console.log(email);
    console.log(password);

    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}api/user/login`,
        withCredentials: true,
        data: {
            email: email,
            password: password,
        },
    }).then((res) => {
        console.log(res.data);
        if (res.data.errors) {
            infosError.innerHTML = res.data.errors.message;
        } else {
            window.location = '/';
        }
    }).catch((err) => {
        console.log(err);
    })
}

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
            />
            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
            />
            <div className="error"></div>
            <input type="submit" value="Se Connecter"/>
        </form>
    )
};

SignInForm.propTypes = {};
export default SignInForm;
