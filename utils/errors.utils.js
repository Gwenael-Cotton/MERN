module.exports.signUpErrors = (error) => {
    const errors = {message: ''};

    if (error.message.includes('pseudo'))
        errors.message = "votre pseudo doit comporter au moin 3 caracteres";

    if (error.message.includes('email'))
        errors.message = "votre email n'est pas valide";

    if (error.message.includes('password'))
        errors.message = "votre mot de passe doit comporter au moins 6 caracteres";

    if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("pseudo"))
        errors.message = "Information(s) deja prise(s)";

    if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("email"))
        errors.message = "Information(s) deja prise(s)";


    return errors;
}

module.exports.signInErrors = (error) => {
    const errors = {message: ''};

    if (error.message)
        errors.message = "votre email ou votre mot de passe n'est pas valide";
    
    return errors;
}