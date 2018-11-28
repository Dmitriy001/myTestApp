import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Button } from 'native-base';


class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    visibleModal = () => this.setState(prevState => ({ visible: !prevState.visible }));

    openLink = () => {
        this.setState({ visible: false }, () => {
            Linking.openURL(this.props.url);
        });
    };

    render () {

        const { name } = this.props;

        return (
            <TouchableOpacity onPress={this.visibleModal} style={styles.viewItem}>
                <Text style={styles.fontSize}>
                    {name}
                </Text>
                <Modal
                    animationType='fade'
                    transparent
                    visible={this.state.visible}
                    onRequestClose={() => {}}
                >
                    <View style={styles.main}>
                        <View style={styles.whiteBox}>
                            <Text style={styles.modalTitle}>{name}</Text>
                            <TouchableOpacity
                                hitSlop={{
                                    left: 30,
                                    right: 30,
                                    top: 10,
                                    bottom: 10
                                }}
                                onPress={this.openLink}
                            >
                                <Text style={styles.link}>
                                    {'open link'}
                                </Text>
                            </TouchableOpacity>
                            <Button
                                onPress={this.visibleModal}
                                bordered
                                dark
                                block
                                style={styles.dark}
                            >
                                <Text>
                                    Close
                                </Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>
        )
    }
}

export default ListItem;

const styles = StyleSheet.create({
    dark: {
        width: 250,
        alignSelf: 'center'
    },
    viewItem: {
        height: 50
    },
    fontSize: {
        fontSize: 25
    },
    main: {
        backgroundColor: 'rgba(24,29,68,0.85)',
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },
    whiteBox: {
        width: 300,
        minHeight: 200,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
});
