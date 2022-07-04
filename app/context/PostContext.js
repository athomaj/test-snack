import React from 'react';
import { Platform } from 'react-native';
import { BASE_URL } from '../config/config';
import postApi from '../services/postApi';
import uploadApi from '../services/uploadApi';
import { randomId } from '../utils/sharedFunctions';

const PostContext = React.createContext();

const initialState = {
    isConnected: false,
    isLoading: true,
    error: false,
    errorMessage: "",
    isInitialized: false,
    post: {
        titre: "",
        date: "",
        time: "",
        seats: "",
        description: "",
        isSearch: "",
        user: ""
    }
}

const PostProvider = ({ children }) => {
    const [postState, setPostState] = React.useState(initialState)

    React.useEffect(() => {
        getCurrentUser()
    }, [])

    const publish = async (data) => {
        setPostState({
            ...postState,
            isLoading: true
        })

        if (data.picture) {
            const formData = new FormData()
            let uri = data.picture
            const imageId = randomId(20)

            formData.append('files', {
                name: `${imageId}.jpg`,
                type: 'image/jpeg',
                uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
            });

            const uploadResponse = await uploadApi.uploadPicture(formData)
            if (uploadResponse[0]?.url) {
                data.post.avatarUrl = BASE_URL + uploadResponse[0].url
            }
        }

        const response = await postApi.publish(data.post)

        if (response.data.error) {
            setPostState({
                ...postState,
                error: true,
                errorMessage: response.data.error.message
            })
            return
        }
        setPostState({
            ...postState,
            isConnected: true,
            isInitialized: true,
            isLoading: false,
        })

    };

    return (
        <PostContext.Provider
            value={{
                publish,
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

const usePostContext = () => {
    return React.useContext(PostContext);
};

export { PostProvider, usePostContext };