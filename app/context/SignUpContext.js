import React from 'react';

import { useUserContext } from './UserContext';

const SignUpContext = React.createContext();

const initialState = {
    email: "",
    password: "",
    countryCode: "",
    phone: "",
    username: "",
    district: "",
}

const SignUpProvider = ({ children }) => {
    const [signUpUser, setsignUpUser] = React.useState(initialState)

    const userContext = useUserContext()

    const updateSignUp1 = async (emailInput, passwordInput, countryCodeInput, phoneInput) => {
        console.log(emailInput, passwordInput, countryCodeInput, phoneInput)
        setsignUpUser({
            ...signUpUser,
            email: emailInput,
            password: passwordInput,
            countryCode: countryCodeInput,
            phone: phoneInput
        })
    };

    const updateSignUp2 = async (usernameInput) => {
        setsignUpUser({
            ...signUpUser,
            username: usernameInput
        })
    };

    const register = async (district) => {
        const data = {
            ...signUpUser,
            district: parseInt(district)
        }

        await userContext.register(data)
    };

    return (
        <SignUpContext.Provider
            value={{
                signUpUser,
                updateSignUp1,
                updateSignUp2,
                register
            }}
        >
            {children}
        </SignUpContext.Provider>
    );
}

const useSignUpContext = () => {
    return React.useContext(SignUpContext);
};

export { SignUpProvider, useSignUpContext };