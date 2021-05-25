"use strict";

import { BASE_URL, requestOptions } from "./common.js";

const valorationsAPI = {
    getAll: function () {
        return new Promise(
            function (resolve, reject) {
                axios.get(`${BASE_URL}/valorations`, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            }
        );
    },
    getByPhoto: function (photoId) {
        return new Promise(
            function (resolve, reject) {
                axios.get(`${BASE_URL}/valorations/${photoId}`, requestOptions)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error.response.data.message));
            }
        );
    },
    create: function (formData) {
        return new Promise(function (resolve, reject) {
            axios
                .post(`${BASE_URL}/valorations`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },
    update: function (valorationId, formData) {
        return new Promise(function (resolve, reject) {
            axios
                .put(`${BASE_URL}/valorations/${valorationId}`, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    delete: function (valorationId) {
        return new Promise(function (resolve, reject) {
            axios
                .delete(`${ BASE_URL }/valorations/${ valorationId }`, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });

    }
};
export {valorationsAPI}