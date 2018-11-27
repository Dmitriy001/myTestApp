import axios from 'axios';

export function registrationUserViaGitHub(data) {
    return dispatch => new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://api.github.com/user',
            data
        })
            .then(resp => resolve(resp))
            .catch(error => reject(error))
    })
}
