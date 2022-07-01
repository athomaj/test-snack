import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
    <TouchableOpacity onPress={() => pickImage()} style={{ height: 200, width: 200, alignItems: 'center', justifyContent: 'center' }}>
      {!image &&
        <Text style={{ zIndex: 1, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#F9BC0A', fontSize: 30, fontWeight: 'bold', borderRadius: 4 }}>+</Text>
      }
      {image ?
        <Image source={{ uri: image }} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100 }} />
        :
        <Image source={require('../../assets/splash_login/userIcon.png')} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100 }} />
      }
    </TouchableOpacity>
  );
}
