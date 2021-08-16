import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlePassword, setControlePassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    const infosError = document.querySelector('.error-control');

    if (password !== controlePassword) {
      infosError.innerHTML = 'Les mots de passe doivent être idendiques';
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          pseudo,
          email,
          password,
        }
      }).then((res) => {
        console.log(res);
        if (password !== controlePassword) {
          infosError.innerHTML = 'Les mots de passe doivent être idendiques';
        } else {
          window.location = '/profil';
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  };


  return (
    <form onSubmit={handleRegister} id='sign-up-form'>
      <label htmlFor="pseudo">Pseudo</label>
      <input
        type="text"
        id="pseudo"
        name="pseudo"
        onChange={(event) => setPseudo(event.target.value)}
        value={pseudo}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <label htmlFor="password">Mot de pass</label>
      <input
        type="text"
        id="password"
        name="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <label htmlFor="email">Confirmez le mot de pass</label>
      <input
        type="text"
        id="control"
        name="control"
        onChange={(event) => setControlePassword(event.target.value)}
        value={controlePassword}
      />
      <div className="error-control"></div>
      <input type="submit" />
    </form>
  );
};

SignUpForm.propTypes = {};
export default SignUpForm;
