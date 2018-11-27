import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Image
} from 'react-native';
import Header from '../Components/Header';
import {
    Values,
    Images
} from '../Themes';

import Form from '../Components/Form';
import Container from '../Components/Container';
import { registrationUserViaGitHub } from '../Redux/auth/actions';

class LoginScreen extends Component {

    constructor (props) {
        super(props);
        this.state = {
            password: null,
            email: null
        };
    }

    componentDidMount() {

    }

    onChangeEmail = text => this.setState({ email: text });

    onChangePass = text => this.setState({ password: text });

    render () {
        const {
            password,
            email
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
                        password={password}
                        email={email}
                        style={styles.form}
                        onChangeEmail={this.onChangeEmail}
                        onChangePass={this.onChangePass}
                    />
                </KeyboardAvoidingView>
            </Container>
        )
    }
}

export default LoginScreen;

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
        top: 120,
        position: 'absolute'
    }
});
