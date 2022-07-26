import React from 'react';
import { Platform } from 'react-native';
import { BASE_URL } from '../config/config';
import authApi from '../services/authApi';
import uploadApi from '../services/uploadApi';
import userApi from '../services/userApi';
import { randomId } from '../utils/sharedFunctions';

const SignUpContext = React.createContext();

const initialState = {
    
        email: "",
        password: "",
        numberPhone: "",
        firstName: "",
        lastName: "",
        district: "",
}

const SignUpProvider = ({ children }) => {
    const [signUpUser, setsignUpUser] = React.useState(initialState)


    const register = async (data) => {

        if (data.picture) {
            const formData = new FormData()
            let uri = data.picture
            const imageId = randomId(20)

            formData.append('files', {
                name: `${imageId}.jpg`,
                type: 'image/jpeg',
                uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
            });

            const uploadResponse = await uploadApi.uploadPicture(formData)
            if (uploadResponse[0]?.url) {
                data.user.avatarUrl = BASE_URL + uploadResponse[0].url
            }
        }

        const response = await authApi.register(data.user)

        if (response.data.error) {
            setsignUpUser({
                ...signUpUser,
                error: true,
                errorMessage: response.data.error.message
            })
            return
        }
    };


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
            firstName: firstNameInput,
            lastName: lastNameInput,
        })
    };
    const updateSignUp3 = async (arrondissementInput) => {
        setsignUpUser({
            ...signUpUser,
            district: parseInt(arrondissementInput)
        })
    };

    return (
        <SignUpContext.Provider
            value={{
                signUpUser,
                updateSignUp1,
                updateSignUp2,
                updateSignUp3,
                register,
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