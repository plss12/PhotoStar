"use strict"
import { photoRenderer } from "/js/renderers/photo.js";
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";
import { usersAPI } from "/js/api/users.js";
import { commentsAPI } from "/js/api/comments.js";
import { messageRenderer } from "/js/renderers/messages.js"
import { sessionManager } from "/js/utils/session.js";
import { galleryRenderer } from "./renderers/gallery.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {
    let selector = document.querySelector("#jsFotoDetails");

    photosAPI.getById(photoId)
        .then(photos => {
            categoriesAPI.getByName(photos[0].category)
                .then(categories => {
                    usersAPI.getById(photos[0].userId)
                        .then(users => {
                            let photoDetails = photoRenderer.asDetails(photos[0], users[0], categories[0]);
                            selector.appendChild(photoDetails);

                            let comentarios = document.querySelector("#jsComentarios");
                            commentsAPI.getByPhoto(photoId)
                                .then(comments => {
                                    let commentsPhotos = galleryRenderer.asPhotoComments(comments);
                                    comentarios.appendChild(commentsPhotos);
                                })
                                .catch(error => messageRenderer.showErrorMessage(error));

                                let commentForm = document.getElementById("añadirComentario");
                                commentForm.onsubmit = handleSubmitComment;
                        })
                        .catch(error => messageRenderer.showErrorMessage(error));
                })
                .catch(error => messageRenderer.showErrorMessage(error));

        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleSubmitComment(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedId());
    formData.append("photoId", photoId);


    commentsAPI.create(formData)
        .then(data => window.location.href = window.location.search)
        .catch(error => messageRenderer.showErrorMessage(error));
    
}


document.addEventListener("DOMContentLoaded", main);