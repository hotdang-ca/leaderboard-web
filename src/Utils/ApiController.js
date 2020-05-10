const API_ROOT = '/api'; // this will be routed via proxy to the API

const ENDPOINTS = {
    Leaderboards: 'leaderboards',
};

const getHeaders = () => {
    return {
        'user-agent': 'leaderboards-web',
        'content-type': 'application/json',
    }
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
