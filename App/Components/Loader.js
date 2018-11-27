import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Image,
    Animated,
    Easing
} from 'react-native';
import { Images } from '../Themes';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.spin();
    }

    spin() {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this.spin());
    }

    render () {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg']
        });
        return (
            <Modal
                animationType='fade'
                transparent
                visible={this.props.visible}
                onRequestClose={() => {}}
            >
                <View style={styles.view}>
                    <Animated.View
                        style={[
                            styles.animatedView,
                            { transform: [{ rotate: spin }]
                            }]}
                    >
                        <Image
                            source={Images.gitHubLogo}
                            style={styles.image}
                            resizeMode={'contain'}
                        />
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}

export default Loader

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }, image: {
        width: 100,
        height: 100
    }, animatedView: {
        alignSelf:'center',
        width: 250,
        height: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
