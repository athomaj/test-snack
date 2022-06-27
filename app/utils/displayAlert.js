import { Alert } from "react-native";

export function displayAlert(alertTitle, alertMessage) {
    Alert.alert(
        alertTitle,
        alertMessage,
        [
            {
                text: `OK`,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ],
        { cancelable: false },
    );
}