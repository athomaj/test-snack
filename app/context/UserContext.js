import React from 'react';
import authApi from '../services/authApi';
import userApi from '../services/userApi';

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
        famillyGame:""
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
        if (!response || response.data.error) {
            setAuthState({
                ...authState,
                isLoading: false,
                isInitialized: true
            })
        } else {
            setAuthState({
                ...authState,
                isLoading: false,
                isInitialized: true,
                user: response.data.user
            })
        }

    }

    const login = async (email, password) => {
        setAuthState({
            ...authState,
            isLoading: true
        })
        const response = await authApi.login(email, password)
        if(response.data.error){
            setAuthState({
                ...authState,
                error: true,
                errorMessage: response.data.error.message
            })
            return
        }
        if(response.data.user){
            setAuthState({
                ...authState,
                isConnected: true,
                isInitialized: true,
                isLoading: false,
                user: response.data.user
            })
        }
    };

    const register = async (firstname, email, password) => {
        setAuthState({
            ...authState,
            isLoading: true
        })
        const response = await authApi.register(firstname, email, password)
        if(response.data.error){
            setAuthState({
                ...authState,
                error: true,
                errorMessage: response.data.error.message
            })
            return
        }
        setAuthState({
            ...authState,
            isConnected: true,
            isInitialized: true,
            isLoading: false,
            user: response.data.user
        })

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
                famillyGame:""
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