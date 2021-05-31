"use strict"
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";
import { friendsAPI } from "/js/api/friends.js";
import { valorationsAPI } from "/js/api/valorations.js";
import { usersAPI } from "/js/api/users.js";



function main() {
    moreFollowers();
    moreMediaValoration();
    morePhotosCategory();
    moreValoracionPhotos();
    moreCommentsPhotos();
}


function moreFollowers() {

    usersAPI.getAll()
        .then(users => {
            let num = new Map();
            for (let i = 0; i < users.length; i++) {
                friendsAPI.getFollowers(users[i].userId)
                    .then(friends => {
                        let foll = friends.length;
                        num.set(users[i], foll);
                    });
            }
            console.log(num);
        })
}


function moreMediaValoration() {

    usersAPI.getAll()
        .then(users => {
            const valoracion = new Map();
            for (let i = 0; i < users.length; i++) {
                photosAPI.getByUser(users[i].userId)
                    .then(photos => {
                        let valMed = 0;
                        for (let j = 0; j < photos.length; j++) {
                            valorationsAPI.getByPhoto(photos[j].photoId)
                                .then(valorations => {
                                    let val = 0;
                                    for (let i = 0; i < valorations.length; i++) {
                                        val += valorations[i].value;
                                    }
                                    valMed += (val / valorations.length);
                                    valoracion.set(users[i], (valMed / photos.length));
                                });
                        }
                    });
            }
            console.log(valoracion);
        })
}

function morePhotosCategory() {
    categoriesAPI.getAll()
        .then(categories => {
            let num = new Map();
            for (let i = 0; i < categories.length; i++) {
                photosAPI.getByCategory(categories[i].name)
                    .then(photos => {
                        num.set(categories[i], photos.length);
                    });
            }
            console.log(num);
        })
}

function moreValoracionPhotos() {

    photosAPI.getAll()
        .then(photos => {
            let num = new Map();
            for (let i = 0; i < photos.length; i++) {
                valorationsAPI.getByPhoto(photoId)
                    .then(valorations => {
                        let val = 0;
                        for (let i = 0; i < valorations.length; i++) {
                            val += valorations[i].value;
                        }
                        num.set(photos[i], val);
                    })
            }
        })
}

function moreCommentsPhotos() {

    photosAPI.getAll()
        .then(photos => {
            let num = new Map();
            for (let i = 0; i < photos.length; i++) {
                commentsAPI.getByPhoto(photoId)
                    .then(comments => {
                        num.set(photos[i], comments.length);
                    })
            }
        })
}


document.addEventListener("DOMContentLoaded", main)