import React from 'react';

import { useUserContext } from './UserContext';

const SignUpContext = React.createContext();

const initialState = {
    email: "",
    password: "",
    numberPhone: "",
    username: "",
    district: "",
}

const SignUpProvider = ({ children }) => {
    const [signUpUser, setsignUpUser] = React.useState(initialState)

    const userContext = useUserContext()

    const updateSignUp1 = async (emailInput, passInput, numberInput) => {
        setsignUpUser({
            ...signUpUser,
            email: emailInput,
            password: passInput,
            numberPhone: numberInput
        })
    };

    const updateSignUp2 = async (firstNameInput, lastNameInput) => {
        setsignUpUser({
            ...signUpUser,
            username: firstNameInput
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