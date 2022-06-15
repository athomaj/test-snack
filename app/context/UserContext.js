import React from 'react';

const UserContext = React.createContext();

const initialState = {
    isConnected: false,
    isLoading: true,
    error: false,
    errorMessage: "",
    isInitialized: false,
    user: {
        email: "",
        firstName: "",
        id: "",
        lastName: "",
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
            isLoading: true
        })

        

    }

    const login = async (email, password) => {
        setAuthState({
            ...authState,
            isLoading: true
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