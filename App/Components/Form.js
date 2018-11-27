import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Platform
} from 'react-native';
import { Button, Text } from 'native-base';
import Values from '../Themes/Values';

const Form = props => {
    return (
        <View style={props.style}>
            <View style={[styles.inputEmail]}>
                <TextInput
                    value={props.email}
                    onChangeText={e => props.onChangeEmail(e)}
                    style={styles.input}
                    placeholder={'Enter username'}
                    selectionColor={'rgba(0,0,0,0.9)'}
                    placeholderTextColor={'rgba(0,0,0,0.2)'}
                />
            </View>
            {/*<View style={styles.inputEmail}>*/}
                {/*<TextInput*/}
                    {/*value={props.password}*/}
                    {/*onChangeText={e => props.onChangePass(e)}*/}
                    {/*placeholder={'password'}*/}
                    {/*placeholderTextColor={'rgba(0,0,0,0.2)'}*/}
                    {/*style={styles.input}*/}
                    {/*selectionColor={'rgba(0,0,0,0.9)'}*/}
                    {/*textContentType={'password'}*/}
                    {/*secureTextEntry={true}*/}
                {/*/>*/}
            {/*</View>*/}
            <Button
                onPress={props.onPress}
                bordered
                dark
                block
                style={styles.dark}
            >
                <Text>
                    Enter
                </Text>
            </Button>

        </View>
    )
};

export default Form;

const styles = StyleSheet.create({
    dark: {
        alignSelf: 'center',
        marginTop: 40,
        width: 200
    },
    input: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        fontSize: 20,
        color: 'black',
        letterSpacing: -0.5,
        width: Values.screenWidth - 130,

    },
    inputEmail: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: Values.screenWidth - 130
    },

});
