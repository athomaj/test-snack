import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../utils/colors';

export default function PostPicturePickerComponent({ image, setParamImage }) {

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setParamImage(result);
        }
    };
    return (
        <View style={{margin: 5}}>
            {image ?
                <Image source={{ uri: image }} style={styles.picture} />
                :
                <TouchableOpacity style={styles.noPicture} onPress={() => pickImage()}>
                    <Image style={styles.defaultImage} source={require("../../assets/icon/addElement.png")}/>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({

    noPicture: {
        width: 110,
        height: 110,
        backgroundColor: colors.green1,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },

    defaultImage: {
        width: 48,
        height: 38.46,
        resizeMode: 'contain'
    },

    picture: {
        width: 110,
        height: 110,
        borderRadius: 4,
    }
})

