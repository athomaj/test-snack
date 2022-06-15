import React from 'react';
import authApi from '../services/authApi';

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
        address: ""
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
            isLoading: false
        })
    }

    const login = async (email, password) => {
        setAuthState({
            ...authState,
            isLoading: true
        })
        const response = await authApi.login(email, password)
        if(response.error){
            setAuthState({
                ...authState,
                error: true,
                errorMessage: response.error
            })
            return
        }
        setAuthState({
            ...authState,
            isConnected: true,
            isInitialized: true,
            isLoading: false,
            user: response.user
        })

    };

    const register = async (user, password) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

    };


    const updateUserInformation = async (userUpdated) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

    };

    const logout = () => auth().signOut();

    return (
        <UserContext.Provider
            value={{
                authState,
                login,
                updateUserInformation,
                register,
                logout,
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