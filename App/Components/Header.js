import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';

const Header = props => {
    return (
        <View style={[
            styles.mainContainer,
            props.rightText ? {borderBottomWidth: 0.5} : {}
            ]}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.elem, styles.arrow]}>
                {props.leftContent}
            </TouchableOpacity>
            <View style={styles.elem}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
            </View>
            <TouchableOpacity
                onPress={props.onPressRightText}
                activeOpacity={0.7}
                style={styles.elem}>
                <Text style={styles.rightText}>
                    {props.rightText}
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default Header;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    elem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 100
    },
    title: {
        color: 'black',
        fontSize: 22,
        fontWeight: '500',
        marginTop: Platform.OS === 'ios' ? 15 : 0
    },
    rightText: {
        fontSize: 18,
        marginTop: 15
    },
    arrow: {
        alignItems: 'flex-start',
        paddingLeft: 20
    }
});
