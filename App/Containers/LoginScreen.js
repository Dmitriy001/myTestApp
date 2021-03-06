import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    AsyncStorage,
    Alert
} from 'react-native';
import Header from '../Components/Header';
import {
    Values,
    Images
} from '../Themes';
import Form from '../Components/Form';
import Container from '../Components/Container';
import Loader from '../Components/Loader';
import { registrationUserViaGitHub } from '../Redux/auth/actions';
import AsyncStorageConfig from '../Config/AsyncStorageConfig';
import SplashScreen from 'react-native-splash-screen';

class LoginScreen extends Component {

    constructor (props) {
        super(props);
        this.state = {
            username: '',
            loader: false,
            password: ''
        };
    }

    componentWillMount() {
        this.checkUserRegistered();
    }

    checkUserRegistered = () => {
        AsyncStorage.getItem(AsyncStorageConfig.USER_REGISTERED).then(value => {
            if (value) {
                this.props.navigation.navigate(
                    'MainScreen',
                    { onCancelLoader: this.cancelLoader });
            } else {
                SplashScreen.hide();
            }
        });
    };

    cancelLoader = () => this.setState({ loader: false });

    onChangeEmail = text => this.setState({ username: text });
    
    onChangePassword = text => this.setState({ password: text });

    onPressEnter = () => {
        const { username, password } = this.state;
        if (!username.length || !password.length) {
            Alert.alert('Please, try again');
            return;
        }
        const { dispatch, navigation } = this.props;
        this.setState({ loader: true }, () => {
            dispatch(registrationUserViaGitHub(username, password)).then(resp => {
                AsyncStorage.setItem(AsyncStorageConfig.USER_REGISTERED, 'true').then(() => {
                    navigation.navigate('MainScreen', { onCancelLoader: this.cancelLoader });
                });
            }).catch(err => {
                this.setState({ loader: false }, () => {
                    setTimeout(() => Alert.alert('Please, try again'), 500);
                });
            });
        });
    };

    render () {
        const {
            username,
            loader
        } = this.state;

        return (
            <Container>
                <Header title={'Login'}/>
                <Image
                    source={Images.gitHubLogo}
                    style={styles.logo}
                />
                <KeyboardAvoidingView
                    behavior= {"padding"}
                    style={[styles.wrapper]}>
                    <Form
                        email={username}
                        style={styles.form}
                        onChangeEmail={this.onChangeEmail}
                        onChangePassword={this.onChangePassword}
                        onPress={this.onPressEnter}
                    />
                </KeyboardAvoidingView>
                <Loader visible={loader}/>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return ({ auth: state.auth });
};

export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
    wrapper: {
        width: Values.screenWidth,
        height: Values.screenHeight - 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        alignSelf: 'center'
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        top: 90,
        position: 'absolute'
    }
});
