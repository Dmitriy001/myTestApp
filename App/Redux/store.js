import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import reducer from './index'
const NODE_ENV = process.env.NODE_ENV;

let middleware;
const middleware2 = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
if (NODE_ENV === 'development') {
    middleware = composeWithDevTools(applyMiddleware(middleware2, thunk))
} else {
    middleware = applyMiddleware(middleware2, thunk)

}

export default createStore(reducer, middleware)
