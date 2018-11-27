import { StackNavigator } from 'react-navigation';
import LoginScreen from '../Containers/LoginScreen';
import MainScreen from '../Containers/MainScreen';

const PrimaryNav = StackNavigator({
    LoginScreen: { screen: LoginScreen },
    MainScreen: { screen: MainScreen }
}, {
    headerMode: 'none',
    initialRouteName: 'LoginScreen'
});

export default PrimaryNav;
