const API_ROOT = '/api'; // this will be routed via proxy to the API

const ENDPOINTS = {
    Leaderboards: 'leaderboards',
    Users: 'users',
    Divisions: 'divisions',
    Scores: 'scores',
    Events: 'events',
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
    getProfile: (userId) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Users}/${userId}`;
        const options = {
            method: 'get',
            headers: getHeaders(),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                if (parsedApiResult.user) {
                    return parsedApiResult.user;
                }
            }).catch((err) => {
                console.log('in catch');
            });
    },
    updateProfile: (userId, newProfile) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Users}/${userId}`;
        const options = {
            method: 'put',
            headers: getHeaders(),
            body: JSON.stringify({user: newProfile }),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                return parsedApiResult;
            }).catch((err) => {
                console.log('in catch');
            });
    }
};

export const DivisionsController = {
    getDivisions: () => {
        const URL = `${API_ROOT}/${ENDPOINTS.Divisions}`;
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
                    return parsedApiResult.divisions;
                }
            }).catch((err) => {
                console.log('error', err);
                throw new Error(err);
            });
    },

    getEventsForDivision: (divisionId) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Divisions}/${divisionId}/events`;
        const options = {
            method: 'get',
            headers: getHeaders(),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                if (parsedApiResult.error) {
                    throw new Error(parsedApiResult.error);
                }

                if (parsedApiResult && parsedApiResult.events) {
                    return parsedApiResult.events;
                }
            }).catch((err) => {
                console.log('error', err);
                throw new Error(err);
            });
    }
}

export const ScoresController = {
    submitScore: (score, userId, eventId) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Scores}`;

        const options = {
            method: 'post',
            headers: getHeaders(),
            body: JSON.stringify({
                score,
                event: eventId,
                user: userId,
            }),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                return parsedApiResult;
            }).catch((err) => {
                throw new Error(err);
            });
    },
    getMyScores: (userId) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Users}/${userId}/scores`;

        const options = {
            method: 'get',
            headers: getHeaders(),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                return parsedApiResult.scores || [];
            }).catch((err) => {
                throw new Error(err);
            });
    }
};

export const EventsController = {
    getAllEvents: () => {
        const URL = `${API_ROOT}/${ENDPOINTS.Events}`;
        const options = {
            method: 'get',
            headers: getHeaders(),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                return parsedApiResult.events || [];
            }).catch((err) => {
                throw new Error(err);
            });
    }
}
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
