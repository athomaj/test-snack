import React from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
    },
    cart: []
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

        if (!auth().currentUser) {
            setAuthState({
                ...authState,
                isLoading: false
            })
            return
        }

        const userId = auth().currentUser.uid
        const userRef = firestore().collection("clients").doc(userId)

        userRef.get().then(async doc => {
            const data = doc.data()
            setAuthState({
                ...authState,
                isLoading: false,
                error: false,
                errorMessage: "",
                isConnected: true,
                isInitialized: true,
                user: data,
                cart: data.cart ? data.cart : []
            })
        }).catch(() => {
            setAuthState({
                ...authState,
                isLoading: false,
                error: false,
                errorMessage: "",
                isInitialized: true
            })
            logout()
        })
    }

    const login = async (email, password) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

        auth().signInWithEmailAndPassword(email, password).then(() => {
            const userId = auth().currentUser.uid
            const userRef = firestore().collection("clients").doc(userId)

            userRef.get().then(async doc => {
                const data = doc.data()
                setAuthState({
                    ...authState,
                    isLoading: false,
                    error: false,
                    errorMessage: "",
                    isConnected: true,
                    isInitialized: true,
                    user: data,
                })
            }).catch(() => {
                setAuthState({
                    ...authState,
                    isLoading: false,
                    error: true,
                    errorMessage: "Une erreur est survenue",
                    isInitialized: true
                })
                logout()
            })
        }).catch(err => {
            let errMessage = ""
            if (err.code == "auth/wrong-password") {
                errorMessage = "Mot de passe incorrect"
            } else if (err.code == "auth/user-not-found") {
                errorMessage = "Aucun utilisateur trouvé avec cette adresse mail"
            } else {
                errorMessage = "Une erreur est survenue"
            }
            setAuthState({
                ...authState,
                isLoading: false,
                error: true,
                errorMessage: errMessage,
                isInitialized: true
            })
        })
    };

    const register = async (user, password) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

        auth().createUserWithEmailAndPassword(user.email, password).then(() => {
            const userId = auth().currentUser.uid
            const userRef = firestore().collection("clients").doc(userId)

            userRef.set(user).then(() => {
                setAuthState({
                    ...authState,
                    isLoading: false,
                    error: false,
                    errorMessage: "",
                    isConnected: true,
                    isInitialized: true,
                    user: user
                })
            }).catch(() => {
                auth().currentUser.delete().then(res => console.log(res)).catch(err => console.log(err))
                setAuthState({
                    ...authState,
                    isLoading: false,
                    error: true,
                    errorMessage: "Une erreur est survenue, veuillez réessayer",
                    isInitialized: true
                })
            })
        }).catch(err => {
            let errMessage = ""
            if (err.code == "auth/email-already-in-use") {
                errorMessage = "Cette email est déjà utilisé"
            } else if (err.code === "auth/invalid-email ") {
                errorMessage = "Cette email n'est pas valide"
            } else {
                errorMessage = "Une erreur est survenue, veuillez réessayer"
            }
            setAuthState({
                ...authState,
                isLoading: false,
                error: true,
                errorMessage: errMessage,
                isInitialized: true
            })
        })
    };

    const updateUserCart = async (newCart) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

        const userId = auth().currentUser.uid
        const userRef = firestore().collection("clients").doc(userId)

        return await userRef.update({cart: newCart}).then(() => {
            setAuthState({
                ...authState,
                isLoading: false,
                error: false,
                errorMessage: "",
                cart: newCart
            })
            return true
        }).catch(err => {
            console.log("err", err)
            setAuthState({
                ...authState,
                isLoading: false,
                error: true,
                errorMessage: "Une erreur est survenue"
            })
            return false
        })
    };

    const updateUserInformation = async (userUpdated) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

        const userId = auth().currentUser.uid
        const userRef = firestore().collection("clients").doc(userId)

        userRef.update(userUpdated).then(() => {
            // setAuthState({
            //     ...authState,
            //     isLoading: false,
            //     error: false,
            //     errorMessage: "",
            //     isInitialized: true,
            // })
            getCurrentUser()
        }).catch(err => {
            console.log("ERROR UPDATING USER ====", err)
            setAuthState({
                ...authState,
                isLoading: false,
                error: true,
                errorMessage: "Une erreur est survenue, veuillez réessayer",
            })
        })
    };

    const updateUserAddress = async (addressUpadted) => {
        setAuthState({
            ...authState,
            isLoading: true
        })

        const userId = auth().currentUser.uid
        const userRef = firestore().collection("clients").doc(userId)

        userRef.update({ address: addressUpadted }).then(() => {
            setAuthState({
                ...authState,
                isLoading: false,
                error: false,
                errorMessage: "",
                isInitialized: true,
                address: addressUpadted
            })
        }).catch(err => {
            console.log("ERROR UPDATING USER ====", err)
            setAuthState({
                ...authState,
                isLoading: false,
                error: true,
                errorMessage: "Une erreur est survenue, veuillez réessayer",
            })
        })
    };

    const logout = () => auth().signOut();

    return (
        <UserContext.Provider
            value={{
                authState,
                login,
                updateUserInformation,
                updateUserCart,
                updateUserAddress,
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