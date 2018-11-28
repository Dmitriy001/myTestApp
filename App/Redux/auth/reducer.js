import { AsyncStorage } from 'react-native';
import AsyncStorageConfig from "../../Config/AsyncStorageConfig";

const initialState = {
    list: null
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIST': {
            return {
                list: state.list
                    ? state.list.concat(action.payload) : [].concat(action.payload)
            };
        }
        case 'CLEAR': {
            AsyncStorage.removeItem(AsyncStorageConfig.LAST_LIST);
            return {
                list: []
            };
        }
        default:
            return state;
    }
};

export default auth;
