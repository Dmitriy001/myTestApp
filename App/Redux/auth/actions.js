import axios from 'axios';

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

// export function registrationUserViaGitHub(data) {
//     debugger
//     return dispatch => new Promise((resolve, reject) => {
//         axios({
//             method: 'get',
//             url: `https://api.github.com/search/repositories?q=uuid`
//         })
//             .then(resp => {
//                 debugger
//                 resolve(resp);
//             }).catch(error => {
//             debugger
//             reject(error);
//         })
//     });
// }

