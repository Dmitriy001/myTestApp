import { combineReducers } from 'redux';
import auth from './auth/reducer';
import nav from './navigation/reducer';

const appReducer = combineReducers({
    auth,
    nav
});

const rootReducer = (state, action) => {
    let newState = state;
    return appReducer(newState, action)
};

export default rootReducer
