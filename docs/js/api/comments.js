"use strict";

import { BASE_URL, requestOptions } from "./common.js";

const commentsAPI = {
    getAll: function () {
        return new Promise(
            function (resolve, reject) {
                axios.get(`${BASE_URL}/comments`, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            }
        );
    },
    getByPhoto: function (photoId) {
        return new Promise(
            function (resolve, reject) {
                axios.get(`${BASE_URL}/comments/${photoId}`, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            }
        );
    },
    create: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/comments`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    update: function (commentsId, formData) {
        return new Promise(function (resolve, reject) {
            axios
                .put(`${BASE_URL}/comments/${commentsId}`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    delete: function (commentsId) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${ BASE_URL }/comments/${ commentsId }`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });

    }
};
export {commentsAPI}