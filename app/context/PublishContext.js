import React from "react";
import { BASE_URL } from "../config/config";
import postApi from "../services/postApi";

const PublishContext = React.createContext();

const initialState = {

    title: "",
    description: "",
    category: "",
    datetime: "",
    seats: "",
    kitchen: "",
    diet: "",
    level: "",
    address: "",
    plus: "",
}

const PublishProvider = ({ children }) => {
    const [publishPost, setPublishPost] = React.useState(initialState)

    React.useEffect(() => {
        console.log(publishPost)
    }, [publishPost])


    return (
        <PublishContext.Provider
            value={{

            }}
        >
            {children}
        </PublishContext.Provider>
    )
}

const usePublishContext = () => {
    return React.useContext(PublishContext)
}

export { PublishProvider, usePublishContext }