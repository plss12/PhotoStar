"use strict"
import { parseHTML } from "/js/utils/parseHTML.js";
import { photoRenderer } from "/js/renderers/photo.js";
import { usersAPI } from "/js/api/users.js";
import { categoriesAPI } from "/js/api/categories.js";
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";



const galleryRenderer = {
    asCardGallery: function (photos) {
        let galleryContainer = parseHTML('<div class= "photo-gallery" > </div>');
        for (let photo of photos) {
            usersAPI.getById(photo.userId)
                .then(users => {
                    categoriesAPI.getByName(photo.category)
                        .then(categories => {
                            let card = photoRenderer.asCard(photo, users[0], categories[0]);
                            galleryContainer.appendChild(card);
                        })
                        .catch(error => {
                            let card = photoRenderer.asCard(photo, users[0], null);
                            galleryContainer.appendChild(card);
                        });
                })
                .catch(error => messageRenderer.showErrorMessage(error));
        }

        return galleryContainer;
    },

    asCardGalleryFollows: function (photos, usersId) {
        let galleryContainer = parseHTML('<div class= "photo-gallery" > </div>');
        const users = [];
        for (let userId of usersId) {
            users.push(userId.userId2);
        }
        for (let photo of photos) {
            if (users.includes(photo.userId)) {
                usersAPI.getById(photo.userId)
                    .then(users => {
                        categoriesAPI.getByName(photo.category)
                            .then(categories => {
                                let card = photoRenderer.asCard(photo, users[0], categories[0]);
                                galleryContainer.appendChild(card);
                            })
                            .catch(error => {
                                let card = photoRenderer.asCard(photo, users[0], null);
                                galleryContainer.appendChild(card)
                            });
                    })
                    .catch(error => messageRenderer.showErrorMessage(error));
            }
        }

        return galleryContainer;
    },

    asCategoryGallery: function (categories) {
        let galleryContainer2 = parseHTML('<div class= "category-gallery" > </div>');

        for (let category of categories) {
            let cat = photoRenderer.asCategory(category);
            galleryContainer2.appendChild(cat);
        }
        return galleryContainer2;
    },
    asCategoryDetails: function (photos) {
        let nombre = photos[0].category;
        let galleryContainer = parseHTML('<div class= "categoryDetails-gallery"></div>');
        for (let photo of photos) {
            if (photo.visibility === "Public") {
                usersAPI.getById(photo.userId)
                    .then(users => {
                        let catDet = photoRenderer.asCategoryDetails(photo, users[0]);
                        galleryContainer.appendChild(catDet);
                    })
                    .catch(error => messageRenderer.showErrorMessage(error));
            }
        }
        return galleryContainer;
    },
    asPerfilDetails: function (photos, userId) {
        let galleryContainer = parseHTML('<div class= "col-12 perfilDetails-gallery"></div>');
        let row = parseHTML('<div class="row"> </div >');
        galleryContainer.appendChild(row);

        let counter = 0;

        for (let photo of photos) {
            if (photo.visibility === "Public" || userId === sessionManager.getLoggedId()) {
                let perCat = photoRenderer.asPerfilDetails(photo);
                row.appendChild(perCat);
                counter += 1;

                if (counter % 3 === 0) {
                    row = parseHTML('<div class= "row"> </div >');
                    galleryContainer.appendChild(row);

                }
            }
        }
        return galleryContainer;
    },
    asPhotoComments: function (comments) {
        let galleryContainer = parseHTML('<div class= "comment-gallery" > </div>');

        for (let comment of comments) {
            usersAPI.getById(comment.userId)
                .then(users => {
                    let commPho = photoRenderer.asComment(comment, users[0]);
                    galleryContainer.prepend(commPho);
                })
                .catch(error => messageRenderer.showErrorMessage(error));

        }
        return galleryContainer;
    },
    asTrendValoraciones: function (trends) {
        let galleryContainer = parseHTML('<div class= "trend-gallery" > </div>');

        for (let trend of trends) {
            photosAPI.getById(trend[0])
            .then(photos => {
                let valPho = photoRenderer.asTrendValoracionComentarios(photos[0], (trend[1]+" valoracion"));
                galleryContainer.appendChild(valPho);
            })
        }
        return galleryContainer;
    },
    asTrendComentarios: function (trends) {
        let galleryContainer = parseHTML('<div class= "trend-gallery" > </div>');

        for (let trend of trends) {
            photosAPI.getById(trend[0])
                .then(photos => {
                    let res = photoRenderer.asTrendValoracionComentarios(photos[0], (trend[1]+" comentarios"));
                    galleryContainer.appendChild(res);
                })
        }
        return galleryContainer;
    },
    asTrendCategorias: function (trends) {
        let galleryContainer = parseHTML('<div class= "trend-gallery" > </div>');

        for (let trend of trends) {
            categoriesAPI.getById(trend[0])
                .then(categories => {
                    let res = photoRenderer.asTrendCategoria(categories[0], ("Num. Fotos " + trend[1]));
                    galleryContainer.appendChild(res);
                })

        }
        return galleryContainer;
    },
    asTrendSeguidores: function (trends) {
        let galleryContainer = parseHTML('<div class= "trend-gallery" > </div>');

        for (let trend of trends) {
            usersAPI.getById(trend[0])
                .then(users => {
                    let res = photoRenderer.asTrendUsers(users[0], ("Num. Seguidores " + trend[1]));
                    galleryContainer.appendChild(res);
                })
        }
        return galleryContainer;
    },
    asTrendMediaValoracion: function (trends) {
        let galleryContainer = parseHTML('<div class= "trend-gallery" > </div>');

        for (let trend of trends) {
            usersAPI.getById(trend[0])
                .then(users => {
                    let res = photoRenderer.asTrendUsers(users[0], ("Val. Media " + trend[1]));
                    galleryContainer.appendChild(res);
                })
        }
        return galleryContainer;
    }
};

export { galleryRenderer };