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
    pictures: {
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
        six: ""
    }
}

const PublishProvider = ({ children }) => {
    const [publishPost, setPublishPost] = React.useState(initialState)

    React.useEffect(() => {
        console.log(publishPost)
    }, [publishPost])

    const updatePublish1 = async (title, desc, category) => {
        setPublishPost({
            ...publishPost,
            title: title,
            description: desc,
            category: category,
        })
    }


    return (
        <PublishContext.Provider
            value={{
                updatePublish1,
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