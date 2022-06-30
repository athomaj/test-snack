import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../utils/colors';

export default function ImagePickerExample({ image, setParamImage }) {

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setParamImage(result);
        }
    };
    return (
        <TouchableOpacity onPress={() => pickImage()} style={{ height: 110, width: 212}}>
            {image ?
                <Image source={{ uri: image }} style={{ position: 'absolute', width: 212, height: 110, borderRadius: 20}} />
                :
                <View style={{ borderRadius: 20, height: 110, width: 212, backgroundColor: colors.greyImage, paddingHorizontal: 15, marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/image.png')} style={{ position: 'absolute', width: 20, height: 20}} />
                </View>
            }
        </TouchableOpacity>
    );
}
