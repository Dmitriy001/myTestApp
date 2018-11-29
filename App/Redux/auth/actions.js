import axios from 'axios';

export function registrationUserViaGitHub(username, password) {
    
    let auth = btoa(username + ":" + password);
    
    return dispatch => new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `https://api.github.com/authorizations`,
            headers: { Authorization: "Basic " + auth },
            data: {
                "scopes": [
                    "public_repo"
                ],
                "note": "admin script"
            }
        }).then(resp => {
            resolve(resp);
        }).catch(error => {
            reject(error);
        });
    });
}

export function searchRepositoriesByQuery(query, params) {
    const { limit, offset } = params;
    return dispatch => new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.github.com/search/repositories?q=${query}`
        })
            .then(resp => {
                dispatch(setList(resp.data.items.slice(offset, offset + limit)));
                resolve(resp);
            }).catch(error => {
            reject(error);
        })
    });
}

export function setList(data) {
    return dispatch => {
        dispatch({ type: 'SET_LIST', payload: data });
    }
}

export function clearFoundObjects() {
    return { type: 'CLEAR' };
}





