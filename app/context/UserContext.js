import React from 'react';
import { Platform } from 'react-native';
import { BASE_URL } from '../config/config';
import authApi from '../services/authApi';
import uploadApi from '../services/uploadApi';
import userApi from '../services/userApi';
import { randomId } from '../utils/sharedFunctions';

const UserContext = React.createContext();

const initialState = {
    isConnected: false,
    isLoading: true,
    error: false,
    errorMessage: "",
    isInitialized: false,
    user: {
        email: "",
        username: "",
        id: "",
        plate: "",
        famillyGame: ""
    }
}

const UserProvider = ({ children }) => {
    const [authState, setAuthState] = React.useState(initialState)

    React.useEffect(() => {
        getCurrentUser()
    }, [])

    const getCurrentUser = async () => {
        setAuthState({
            ...authState,
            isLoading: true
        })

        const response = await userApi.getMe()
        if (!response) {
            setAuthState({
                ...authState,
                isLoading: false,
                isInitialized: true,
            })
        } else {
            setAuthState({
                ...authState,
                isLoading: false,
                isInitialized: true,
                isConnected: true,
                user: response.data
            })
        }

    }

    const login = async (email, password) => {
        setAuthState({
            ...authState,
            isLoading: true
        })
        const response = await authApi.login(email, password)

        if (response.data.error) {
            setAuthState({
                ...authState,
                error: true,
                errorMessage: response.data.error.message
            })
            return
        }
        if (response.data.user) {
            getCurrentUser()
            // setAuthState({
            //     ...authState,
            //     isConnected: true,
            //     isInitialized: true,
            //     isLoading: false,
            //     user: response.data.user
            // })
        }
    };

    const register = async (data) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

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
            setAuthState({
                ...authState,
                error: true,
                errorMessage: response.data.error.message
            })
            return
        }
        getCurrentUser()
        // const user = await userApi.getMe()
        // setAuthState({
        //     ...authState,
        //     isConnected: true,
        //     isInitialized: true,
        //     isLoading: false,
        //     user: response.data.user
        // })

    };


    const updateUserInformation = async (userUpdated) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

    };

    const disconnect = async () => {
        await authApi.disconnect()
        setAuthState({
            ...authState,
            isConnected: false,
            isLoading: false,
            user: {
                email: "",
                username: "",
                id: "",
                plate: "",
                famillyGame: ""
            }
        })
    };

    return (
        <UserContext.Provider
            value={{
                authState,
                login,
                updateUserInformation,
                register,
                disconnect,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

const useUserContext = () => {
    return React.useContext(UserContext);
};

export { UserProvider, useUserContext };