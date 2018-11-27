import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Keyboard
} from 'react-native';

const Container = props => (
    <TouchableOpacity
        style={[ styles.main, props.style ]}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
    >
        {props.children}
    </TouchableOpacity>
);

export default Container;

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%'
    }
});
