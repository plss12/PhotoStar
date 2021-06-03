"use strict"
import { galleryRenderer } from "/js/renderers/gallery.js";
import { photosAPI } from "/js/api/photos.js";
import { commentsAPI } from "/js/api/comments.js";
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

function orderObjectTop5(trend) {
    var sortable = [];
    for (var top in trend) {
        sortable.push([top, trend[top]]);
    }

    sortable.sort(function (a, b) {
        return (b[1] - a[1])
    })
    return (sortable.slice(0, 5));
}


function moreFollowers() {
    let content4 = document.querySelector("#jsTrendFollow");

    usersAPI.getAll()
        .then(users => {
            var num = {};
            for (let i = 0; i < users.length; i++) {
                friendsAPI.getFollowers(users[i].userId)
                    .then(friends => {
                        let foll = friends.length;
                        num[users[i].userId] = foll;
                        if (i === users.length - 1) {
                            let gallery4 = galleryRenderer.asTrendSeguidores(orderObjectTop5(num));
                            content4.appendChild(gallery4);
                        }
                    })
                    .catch(error => {
                        if (i === users.length - 1) {
                            let gallery4 = galleryRenderer.asTrendSeguidores(orderObjectTop5(num));
                            content4.appendChild(gallery4);
                        }
                    });
            }
        })
}

function moreMediaValoration() {
    let content5 = document.querySelector("#jsTrendValMed");
    var valoracion = {};

    usersAPI.getAll()
        .then(users => {
            for (let i = 0; i < users.length; i++) {
                photosAPI.getByUser(users[i].userId)
                    .then(photos => {
                        let valMed = 0;
                        let p = 0;
                        for (let j = 0; j < photos.length; j++) {
                            if (photos[j].visibility === "Public") {
                                p++;
                                valorationsAPI.getByPhoto(photos[j].photoId)
                                    .then(valorations => {
                                        let val = 0;
                                        for (let i = 0; i < valorations.length; i++) {
                                            val += valorations[i].value;
                                        }
                                        valMed += (val / valorations.length);
                                        let res = (valMed / p);
                                        valoracion[users[i].userId] = res.toFixed(2);

                                        if (i === users.length - 1 && j === photos.length - 1) {
                                            let gallery5 = galleryRenderer.asTrendMediaValoracion(orderObjectTop5(valoracion));
                                            content5.appendChild(gallery5);
                                        }
                                    })
                                    .catch(error => {
                                        if (i === users.length - 1 && j === photos.length - 1) {
                                            let gallery5 = galleryRenderer.asTrendMediaValoracion(orderObjectTop5(valoracion));
                                            content5.appendChild(gallery5);
                                        }
                                    });
                            }
                        }
                    })
                    .catch(error => {
                        if (i === users.length - 1 ) {
                            setTimeout(function(){
                                let gallery5 = galleryRenderer.asTrendMediaValoracion(orderObjectTop5(valoracion));
                                content5.appendChild(gallery5);
                            },3000)
                        }
                    });
            }
        })
}

function morePhotosCategory() {
    let content3 = document.querySelector("#jsTrendCat");

    categoriesAPI.getAll()
        .then(categories => {
            var num = {};
            for (let i = 0; i < categories.length; i++) {
                photosAPI.getByCategory(categories[i].name)
                    .then(photos => {
                        num[categories[i].categoryId] = photos.length;
                        if (i === categories.length - 1) {
                            let gallery3 = galleryRenderer.asTrendCategorias(orderObjectTop5(num));
                            content3.appendChild(gallery3);
                        }
                    })
                    .catch(error => {
                        if (i === categories.length - 1) {
                            let gallery3 = galleryRenderer.asTrendCategorias(orderObjectTop5(num));
                            content3.appendChild(gallery3);
                        }
                    });
            }
        })
}

function moreValoracionPhotos() {
    let content1 = document.querySelector("#jsTrendVal");

    photosAPI.getThisWeek()
        .then(photos => {
            var num = {};
            for (let i = 0; i < photos.length; i++) {
                valorationsAPI.getByPhoto(photos[i].photoId)
                    .then(valorations => {
                        let val = 0;
                        for (let i = 0; i < valorations.length; i++) {
                            val += valorations[i].value;
                        }
                        num[photos[i].photoId] = (val / valorations.length);
                        if (i === photos.length - 1) {
                            let gallery1 = galleryRenderer.asTrendValoraciones(orderObjectTop5(num));
                            content1.appendChild(gallery1);
                        }
                    })
                    .catch(error => {
                        if (i === photos.length - 1) {
                            let gallery1 = galleryRenderer.asTrendValoraciones(orderObjectTop5(num));
                            content1.appendChild(gallery1);
                        }
                    })
            }
        })
}

function moreCommentsPhotos() {
    let content2 = document.querySelector("#jsTrendComen");

    photosAPI.getThisWeek()
        .then(photos => {
            var num = {};
            for (let i = 0; i < photos.length; i++) {
                commentsAPI.getByPhoto(photos[i].photoId)
                    .then(comments => {
                        num[photos[i].photoId] = comments.length;
                        if (i === photos.length - 1) {
                            let gallery2 = galleryRenderer.asTrendComentarios(orderObjectTop5(num));
                            content2.appendChild(gallery2);
                        }
                    })
                    .catch(error => {
                        if (i === photos.length - 1) {
                            let gallery2 = galleryRenderer.asTrendComentarios(orderObjectTop5(num));
                            content2.appendChild(gallery2);
                        }
                    })
            }
        })
}


document.addEventListener("DOMContentLoaded", main)