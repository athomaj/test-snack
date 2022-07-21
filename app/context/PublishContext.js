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
    bonus: "",
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
        //console.log(publishPost)
    }, [publishPost])

    const updatePublish1 = async (title, desc, category) => {
        setPublishPost({
            ...publishPost,
            title: title,
            description: desc,
            category: category,
        })
    }

    const updatePublish2 = async (picture) => {
        setPublishPost({
            ...publishPost,
            pictures: {
                one: picture[0]?.uri,
                two: picture[1]?.uri,
                three: picture[2]?.uri,
                four: picture[3]?.uri,
                five: picture[4]?.uri,
                six: picture[5]?.uri
            }
        })
    }

    const updatePublish3 = async (date, seats, kitchen, diet, level) => {
        const newKitchen = []
        const newDiet = []
        const newLevel = []

        kitchen.filter(item => {
            if (item.status === true) {
                newKitchen.push(item.title)
            }
        })

        diet.filter(item => {
            if (item.status === true) {
                newDiet.push(item.title)
            }
        })

        level.filter(item => {
            if (item.status === true) {
                newLevel.push(item.title)
            }
        })

        setPublishPost({
            ...publishPost,
            datetime: date,
            seats: seats,
            kitchen : newKitchen,
            diet: newDiet,
            level: newLevel,
        })
    }

    const updatePublish4 = async (address, bonus) => {
        const newBonus = []

        bonus.filter(item => {
            if (item.status === true) {
                newBonus.push(item.title)
            }
        })
        console.log(newBonus)

        setPublishPost({
            ...publishPost,
            address: address,
            bonus: bonus
        })

        finalPost()
    }

    const finalPost = async () => {

    }


    return (
        <PublishContext.Provider
            value={{
                updatePublish1,
                updatePublish2,
                updatePublish3,
                updatePublish4,
                finalPost,
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