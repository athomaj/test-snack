import React from "react";
import { Text, TextInput, View } from "react-native";

import { colors } from "../../utils/colors";

export const TextAreaComponent = React.forwardRef(({ heightSize, legend, maxChar, callBackText, placeholder, value, ismultiline, onSubmitEditing, returnKeyType }, ref) => {


    return (
        <View
            // ref = {ScrollRef}
            style={{ backgroundColor: colors.secondaryColor, borderRadius: 4, width: '100%', height: heightSize, padding: 10, marginBottom: 15 }}
        >
            <Text style={{ color: colors.darkColor, fontWeight: '500', fontSize: 15, height: 20, textAlignVertical: 'center' }}>{legend}</Text>
            <TextInput
                value={value}
                style={{ maxHeight: heightSize - 40 }}
                autoCorrect={true}
                spellCheck={true}
                maxLength={maxChar}
                onChangeText={(text) => callBackText(text)}
                multiline={ismultiline ? true : false}
                placeholder={placeholder}
                ref={ref ? ref : null}
                returnKeyType={returnKeyType}

                onEndEditing={onSubmitEditing}
                blurOnSubmit={false}
            // onContentSizeChange={ScrollRef.current?.scrollToEnd({ animated: true })}
            >
            </TextInput>
            {
                maxChar &&
                <Text style={{ position: "absolute", bottom: 8, right: 8, color: colors.darkColor, fontWeight: '500', fontSize: 15 }}>{`${value.length}/${maxChar}`}</Text>
            }

        </View>
    )
})