import React from "react";
import { Text, TextInput, View } from "react-native";

import { colors } from "../../utils/colors";

export const TextAreaComponent = React.forwardRef(({ heightSize, legend, maxChar, callBackText, placeholder, value, ismultiline, onSubmitEditing, returnKeyType }, ref) => {


    return (
        <View
            // ref = {ScrollRef}
            style={{ backgroundColor: 'white', borderRadius: 4, width: '100%', height: heightSize, padding: 10, marginBottom: 15 }}
        >
            <Text style={{ color: colors.green1, fontWeight: '500', fontSize: 15, height: 20, textAlignVertical: 'center' }}>{legend}</Text>
            <TextInput
                value={value}
                style={{ maxHeight: heightSize - 40 }}
                autoCorrect={true}
                spellCheck={true}
                maxLength={maxChar}
                onChangeText={(text) => callBackText(text)}
                multiline={ismultiline ? true : false}
                placeholder={placeholder}
                placeholderTextColor={colors.darkGreen}
                ref={ref ? ref : null}
                returnKeyType={returnKeyType}
                onEndEditing={onSubmitEditing}
                blurOnSubmit={false}
            // onContentSizeChange={ScrollRef.current?.scrollToEnd({ animated: true })}
            >
            </TextInput>
            {
                maxChar &&
                <Text style={{ position: "absolute", bottom: 8, right: 8, color: colors.darkGreen, fontWeight: '500', fontSize: 15 }}>{`${value ? value.length : 0}/${maxChar}`}</Text>
            }

        </View>
    )
})