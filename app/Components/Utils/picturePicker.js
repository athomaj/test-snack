import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// Camera & Image Picker

// const openImagePicker = async () => {
//     try {
//         // Ask the user for the permission to access the media library 

//         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()


//         if (permissionResult.granted === false) {
//             alert("You've refused to allow this appp to access your photos!");
//             return;
//         } 

//         const result = await ImagePicker.launchImageLibraryAsync();

//         // Explore the result
//         console.log(result);

//         if (result.cancelled === false) {
//             setPickedImagePath(result.uri);
//             console.log(result.uri);
//         }
//     } catch (error) {
//         alert('Error Occur: ' + error.message)
//         closeSheet()
//     }
// }

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
      <TouchableOpacity onPress={pickImage} style={{ height: 200, width: 200, alignItems: 'center', justifyContent:'center'}}>
      {!image &&
      <Text style={{zIndex: 1, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#F9BC0A', fontSize: 30, fontWeight: 'bold', borderRadius: 4 }}>+</Text>
      }
      {image ? 
          <Image source={{ uri: image }} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100}}/>
        : 
          <Image source={require('../../assets/splash_login/userIcon.png')} style={{ position: 'absolute', width: 200, height: 200, borderRadius: 100}}/>
        }
      </TouchableOpacity>
  );
}
