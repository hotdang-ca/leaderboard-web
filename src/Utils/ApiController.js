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
    getUsers: () => {
        const URL = `${API_ROOT}/${ENDPOINTS.Users}/`;
        const options = {
            method: 'get',
            headers: getHeaders(),
        };
        return fetch(URL, options).then((apiResult) => apiResult.json())
        .then((parsedApiResult) => {
            if (parsedApiResult.users) {
                return parsedApiResult.users;
            }
            return parsedApiResult;
        }).catch((err) => {
            throw new Error(err);
        });
    },

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
    createDivision: (newDivision) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Divisions}`;
        const options = {
            method: 'post',
            headers: getHeaders(),
            body: JSON.stringify({
                name: newDivision,
            })
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                if (parsedApiResult.error) {
                    throw new Error(parsedApiResult.error);
                }

                if (parsedApiResult && parsedApiResult.division) {
                    return parsedApiResult.division;
                }
            }).catch((err) => {
                console.log('error', err);
                throw new Error(err.message);
            });
    },

    deleteDivision: (divisionId) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Divisions}/${divisionId}`;
        const options = {
            method: 'delete',
            headers: getHeaders(),
        }

        return fetch(URL, options)
            .then((rawResponse) => {
                if (rawResponse.status == 204) {
                    return { status: 204, message: 'ok' }
                } else {
                    return rawResponse.json();
                }
            })
            .then((response) => {
                return response;
            }).catch((err) => {
                console.log('Division Delete error: ', err);
                throw new Error(err.message);
            });
    },

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
    getAllScores: () => {
        const URL = `${API_ROOT}/${ENDPOINTS.Scores}`;
        const options = {
            method: 'get',
            headers: getHeaders(),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
        .then((parsedApiResult) => {
            if (!parsedApiResult.scores && parsedApiResult.error) {
                return { error: parsedApiResult.error };
            }

            return parsedApiResult.scores;
        }).catch((err) => {
            throw new Error(err);
        });
    },
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
                if (!parsedApiResult.score && parsedApiResult.error) {
                    return { error: parsedApiResult.error };
                }

                return parsedApiResult.score;
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
    },
    deleteScore: (scoreId) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Scores}/${scoreId}`;
        const options = {
            method: 'delete',
            headers: getHeaders(),
        };

        return fetch(URL, options).then((apiResult) => {
            return { deleted: apiResult === 204 };
        })
        .then((result) => {
            if (result.deleted) {
                return result;
            }
        }).catch((err) => {
            throw new Error(err);
        });
    },
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
    },

    createEvent: (newEventData) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Events}`;
        const options = {
            method: 'post',
            headers: getHeaders(),
            body: JSON.stringify(newEventData)
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                return parsedApiResult.event;
            }).catch((err) => {
                throw new Error(err);
            });
    },

    deleteEvent: (eventId) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Events}/${eventId}`;
        const options = {
            method: 'delete',
            headers: getHeaders(),
        };
        return fetch(URL, options)
            .then((rawResponse) => {
                if (rawResponse.status == 204) {
                    return { status: 204, message: 'ok' }
                } else {
                    return rawResponse.json();
                }
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw new Error(err);
            });
    },
    
    update: (eventId, updates) => {
        const URL = `${API_ROOT}/${ENDPOINTS.Events}/${eventId}`;
        const options = {
            method: 'put',
            headers: getHeaders(),
            body: JSON.stringify(updates),
        };

        return fetch(URL, options).then((apiResult) => apiResult.json())
            .then((parsedApiResult) => {
                return parsedApiResult.event || {};
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

                if (parsedApiResult && parsedApiResult.leaderboardData) {
                    return parsedApiResult.leaderboardData;
                }
            }).catch((err) => {
                console.log('error', err);
                throw new Error(err);
            });
    },
};
