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
    isLoginScreen: true,
    user: {
        email: "",
        username: "",
        id: "",
        avatarUrl: "",
        plate: "",
        famillyGame: ""
    }
}

const UserProvider = ({ children }) => {
    const [authState, setAuthState] = React.useState(initialState)

    React.useEffect(() => {
        getCurrentUser(true)
    }, [])


    const getCurrentUser = async (isLogin) => {
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
                user: response.data,
                isLoginScreen: isLogin
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
                isLoading: false,
                error: true,
                errorMessage: response.data.error.message
            })
            return
        }
        getCurrentUser(true)
    };

    const register = async (data) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

        const response = await authApi.register(data)

        if (response.data.error) {
            setAuthState({
                ...authState,
                isLoading: false,
                error: true,
                errorMessage: response.data.error.message
            })
            return
        }
        getCurrentUser(false)
    };

    const updatePicture = async (imageUri) => {
        const formData = new FormData()
        const imageId = randomId(20)

        formData.append('files', {
            name: `${imageId}.jpg`,
            type: 'image/jpeg',
            uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
        });

        const uploadResponse = await uploadApi.uploadPicture(formData)

        if (uploadResponse[0]?.url) {
            const pictureURL = BASE_URL + uploadResponse[0].url

            const updateAvatar = {
                "avatarUrl": pictureURL
            }
            userApi.updateUser(updateAvatar, authState.user.id)
            const newStateStatus = { ...authState }
            newStateStatus.user.avatarUrl = pictureURL
            setAuthState(newStateStatus)

        }
        else console.log("BAAAD REQUEST ===================================>", uploadResponse)
    }

    const updateUserInformation = async (userUpdated) => {

        for (const [key, value] of Object.entries(userUpdated)) {
            const edintingState = { ...authState }
            const entries = Object.keys(authState.user).includes(key)
            if (entries) {

                edintingState.user[key] = value
                setAuthState(edintingState)
            }
        }
        userApi.updateUser(userUpdated, authState.user.id)
        getCurrentUser()
    };

    const updatePendingsUser = async (idUser) => {
        const edditingArray = []
        const sponsors = await userApi.getSponsorsOf(idUser);
        if (sponsors > 0) {
            sponsors.forEach(element => {
                element.id !== idUser ? edditingArray.push(element.id) : null
            });
        }
        console.log(edditingArray)

    }
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
                updatePicture,
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