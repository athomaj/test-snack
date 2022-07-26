import React from "react";
import { Platform } from "react-native";
import { BASE_URL } from "../config/config";
import postApi from "../services/postApi";
import uploadApi from "../services/uploadApi";
import { randomId } from "../utils/sharedFunctions";
import { useUserContext } from "./UserContext";

const PublishContext = React.createContext();

const initialState = {

    title: "",
    description: "",
    category: "",
    datetime: "",
    seats: 0,
    kitchens: "",
    diets: "",
    level: "",
    address: "",
    bonus: "",
    pictures: []
}

const PublishProvider = ({ children }) => {
    const [publishPost, setPublishPost] = React.useState(initialState)
    const [loading, setLoading] = React.useState(false)

    const userContext = useUserContext()

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
            pictures: picture
        })
    }

    const updatePublish3 = async (date, seats, kitchen, diet, levelSelected) => {
        const newKitchen = []
        const newDiet = []

        kitchen.filter(item => {
            if (item.status === true) {
                newKitchen.push(item.id)
            }
        })

        diet.filter(item => {
            if (item.status === true) {
                newDiet.push(item.id)
            }
        })

        setPublishPost({
            ...publishPost,
            datetime: date,
            seats: seats,
            kitchens: newKitchen,
            diets: newDiet,
            level: { id: levelSelected },
        })
    }

    const updatePublish4 = async (address, bonus) => {
        const newBonus = []

        bonus.filter(item => {
            if (item.status === true) {
                newBonus.push(item.id)
            }
        })

        setPublishPost({
            ...publishPost,
            address: address,
            bonus: bonus
        })

        await finalPost()
    }

    const finalPost = async () => {
        setLoading(true)
        const newPictures = []

        publishPost.pictures.filter(item => {
            newPictures.push(item.uri)
        })
        const data = {
            post: {
                title: publishPost.title,
                description: publishPost.description,
                category: { id: publishPost.category },
                datetime: new Date(publishPost.datetime).getTime(),
                seats: publishPost.seats,
                kitchens: publishPost.kitchens,
                diets: publishPost.diets,
                level: publishPost.level,
                address: publishPost.address,
                // bonus: publishPost.bonus
            },
            picture: newPictures,
        }

        try {

            if (data.picture) {
                const formData = new FormData()

                formData.append('data', JSON.stringify(data.post))
                newPictures.map((item) => {
                    const imageId = randomId(20)
                    formData.append('files.pictures', {
                        name: `${imageId}.jpg`,
                        type: 'image/jpeg',
                        uri: Platform.OS === 'ios' ? item.replace('file://', '') : item,
                    });
                });

                const response = await postApi.publish(formData)

                console.log("RES PROMISE ===", response)
                console.log("YOOOOOOOOOOOOO ===")
                setLoading(false)
            }
        } catch (error) {
            console.log("ERR UPLOAD POST ====", error)
            setLoading(false)
        }
    }


    return (
        <PublishContext.Provider
            value={{
                loading,
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