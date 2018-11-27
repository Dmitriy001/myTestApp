import React from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import Values from '../Themes/Values';

const Form = props => {
    return (
        <View style={props.style}>
            <View style={[styles.inputEmail, { marginBottom: 20 }]}>
                <TextInput
                    value={props.email}
                    onChangeText={e => props.onChangeEmail(e)}
                    style={styles.input}
                    placeholder={'e-mail'}
                    selectionColor={'rgba(0,0,0,0.9)'}
                    textContentType={'emailAddress'}
                    placeholderTextColor={'rgba(0,0,0,0.2)'}
                />
            </View>
            <View style={styles.inputEmail}>
                <TextInput
                    value={props.password}
                    onChangeText={e => props.onChangePass(e)}
                    placeholder={'password'}
                    placeholderTextColor={'rgba(0,0,0,0.2)'}
                    style={styles.input}
                    selectionColor={'rgba(0,0,0,0.9)'}
                    textContentType={'password'}
                    secureTextEntry={true}
                />
            </View>

        </View>
    )
};

export default Form;

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        fontSize: 20,
        color: 'black',
        letterSpacing: -0.5,
        width: Values.screenWidth - 130,

    },
    inputEmail: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: Values.screenWidth - 130
    },

});
