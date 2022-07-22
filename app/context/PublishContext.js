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
    seats: "",
    kitchens: "",
    diets: "",
    levels: "",
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

    const userContext = useUserContext()

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
            pictures: picture
        })
    }

    const updatePublish3 = async (date, seats, kitchen, diet, level) => {
        const newKitchen = []
        const newDiet = []
        const newLevel = []

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

        level.filter(item => {
            if (item.status === true) {
                newLevel.push(item.id)
            }
        })

        setPublishPost({
            ...publishPost,
            datetime: date,
            seats: seats,
            kitchens: newKitchen,
            diets: newDiet,
            levels: newLevel,
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

        finalPost()
    }

    const finalPost = async () => {
        const newPictures = []
        publishPost.pictures.filter(item => {
            newPictures.push(item.uri)
        })
        const data = {
            post: {
                title: publishPost.title,
                description: publishPost.description,
                category: {id: publishPost.category},
                datetime: publishPost.datetime,
                seats: publishPost.seats,
                kitchens: publishPost.kitchens,
                diets:  publishPost.diets,
                levels: publishPost.levels,
                address: publishPost.address,
                bonus: publishPost.bonus
            },
            picture: Platform.OS === 'ios' ? newPictures.replace('file://', '') : newPictures,
        }

        const index = 0
        console.log(data.picture)
        if (data.picture) {
            while(data.picture[index]){
                const formData = new FormData()
                let uri = data.picture[index]
                const imageId = randomId(20)

                formData.append('files', {
                    name: `${imageId}.jpg`,
                    type: 'image/jpeg',
                    uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
                });

                const uploadResponse = await uploadApi.uploadPicture(formData)

                console.log(uploadResponse)

                if (uploadResponse[0]?.url) {
                    data.post.pictures = [...data.post.picture, BASE_URL + uploadResponse[0].url]
                }
                index = index + 1
            }
        }
        // const response = await postApi.publish({ data: data.post })

        // if (response.data.error) {
        //     console.log(response)
        // }
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