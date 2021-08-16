import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = ( props ) => {

    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (event) => {
        if (event.target.id === 'register') {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (event.target.id === 'login') {
            setSignInModal(true);
            setSignUpModal(false);
        }
    };

return (
    <div className="connection-form">
            <div className="connection-form">
                <ul>
                    <li onClick={handleModals} id="register">S'inscrire</li>
                    <li onClick={handleModals} id="login">Se connecter</li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
        </div>
    </div>
    );
};

Log.propTypes = {};
export default Log;
