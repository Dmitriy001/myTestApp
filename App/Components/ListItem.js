import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity
} from 'react-native';

import { Images } from '../Themes';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    visibleModal = () => this.setState(prevState => ({ visible: !prevState.visible }));

    render () {

        const {
            name,
        } = this.props;

        return (
            <TouchableOpacity onPress={this.visibleModal} style={styles.viewItem}>
                <Text style={styles.fontSize}>
                    {name.slice(0, 30)}
                </Text>
                <Modal
                    animationType='fade'
                    transparent
                    visible={this.state.visible}
                    onRequestClose={() => {}}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.main}
                        onPress={this.visibleModal}
                    >
                        <View style={styles.whiteBox}>
                            <Text>Some content will be here.</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </TouchableOpacity>
        )
    }
}

export default ListItem;

const styles = StyleSheet.create({
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
        height: 200,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
});
