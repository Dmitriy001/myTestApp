import axios from 'axios';
import AsyncStorageConfig from "../../Config/AsyncStorageConfig";

export function registrationUserViaGitHub(username) {
    return dispatch => new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.github.com/users/${username}`
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





