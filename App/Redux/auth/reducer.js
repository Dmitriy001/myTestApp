const initialState = {
    list: null
};
const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIST': {
            return {
                ...state,
                list: state.list ?
                    state.list.concat(action.payload) : [].concat(action.payload)
            }
        }
        default:
            return state;
    }
};

export default auth;
