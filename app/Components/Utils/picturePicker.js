import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
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
      console.log(result);
      setParamImage(result);
    }
  };
  return (
    <TouchableOpacity onPress={() => pickImage()} style={{ height: 280, width: 280, alignItems: 'center', justifyContent: 'center', borderRadius: 140, backgroundColor: colors.secondaryColor}}>
      {/* {!image &&
        <Text style={{ zIndex: 1, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#F9BC0A', fontSize: 30, fontWeight: 'bold', borderRadius: 4 }}>+</Text>
      } */}
      {image ?
        <Image source={{ uri: image }} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: 140 }} />
        :
        <Image source={require('../../assets/onboarding/pictureOnboarding.png')} style={{ position: 'absolute', width: 60, height:54, resizeMode: 'contain' }} />
      }
    </TouchableOpacity>
  );
}
