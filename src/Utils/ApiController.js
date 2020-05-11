const API_ROOT = '/api'; // this will be routed via proxy to the API

const ENDPOINTS = {
    Leaderboards: 'leaderboards',
    Users: 'users',
};

const getHeaders = () => {
    return {
        'user-agent': 'leaderboards-web',
        'content-type': 'application/json',
    }
};

export const UsersController = {
    register: (userObject) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Users}/register`;

        const options = {
            method: 'post',
            headers: getHeaders(),
            body: JSON.stringify(userObject),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                return parsedApiResult;
            }).catch((err) => {
                throw new Error(err);
            });
    },
    login: (email, password) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Users}/login`;
        const options = {
            method: 'post',
            headers: getHeaders(),
            body: JSON.stringify({ email, password }),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                console.log('in then');
                return parsedApiResult;
            }).catch((err) => {
                console.log('in catch');
                throw new Error(err);
            });
    },
};

export const LeaderboardsController = {
    getAll: () => {
        const URL = `${API_ROOT}/${ENDPOINTS.Leaderboards}/all`;
        const options = {
            method: 'get',
            headers: getHeaders(),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                if (parsedApiResult.error) {
                    throw new Error(parsedApiResult.error);
                }

                if (parsedApiResult && parsedApiResult.divisions) {
                    return parsedApiResult;
                }
            }).catch((err) => {
                console.log('error', err);
                throw new Error(err);
            });
    },
};
