"use strict";

import { BASE_URL, requestOptions } from "./common.js";

const friendsAPI = {
    getAll: function () {
        return new Promise(
            function (resolve, reject) {
                axios.get(`${BASE_URL}/friends`, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            }
        );
    },
    getFollows: function (userId1) {
        return new Promise(
            function (resolve, reject) {
                axios.get(`${BASE_URL}/friends/follows/${userId1}`, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            }
        );
    },
    getFollowers: function (userId1) {
        return new Promise(
            function (resolve, reject) {
                axios.get(`${BASE_URL}/friends/followers/${userId1}`, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            }
        );
    },
    create: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/friends`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    delete: function (userId1, userId2) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${ BASE_URL }/friends/${userId1}/${userId2}`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });

    }
};
export {friendsAPI}