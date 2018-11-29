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
            <View style={styles.inputEmail}>
                <TextInput
                    value={props.email}
                    onChangeText={e => props.onChangeEmail(e)}
                    style={[styles.input, { marginBottom: 10 }]}
                    placeholder={'Enter username'}
                    selectionColor={'rgba(0,0,0,0.9)'}
                    placeholderTextColor={'rgba(0,0,0,0.2)'}
                />
                <TextInput
                    secureTextEntry
                    value={props.password}
                    onChangeText={e => props.onChangePassword(e)}
                    style={styles.input}
                    placeholder={'Enter password'}
                    selectionColor={'rgba(0,0,0,0.9)'}
                    placeholderTextColor={'rgba(0,0,0,0.2)'}
                />
            </View>
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
        marginTop: 20,
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
        flexDirection: 'column',
        alignItems: 'center',
        width: Values.screenWidth - 130
    },

});
