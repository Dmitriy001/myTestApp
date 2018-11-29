import { combineReducers } from 'redux';
import auth from './auth/reducer';

const appReducer = combineReducers({
    auth
});

const rootReducer = (state, action) => {
    let newState = state;
    return appReducer(newState, action)
};

export default rootReducer
