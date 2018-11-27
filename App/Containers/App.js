import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './../Redux/store';
import AppNavigation from "../Navigation/AppNavigation";

export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <AppNavigation/>
            </Provider>
        );
    }
}

