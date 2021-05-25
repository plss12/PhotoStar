"use strict"
import { photoRenderer } from "/js/renderers/photo.js";
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";
import { usersAPI } from "/js/api/users.js";
import { commentsAPI } from "/js/api/comments.js";
import { valorationsAPI } from "/js/api/valorations.js";
import { friendsAPI } from "/js/api/friends.js";
import { messageRenderer } from "/js/renderers/messages.js"
import { sessionManager } from "/js/utils/session.js";
import { galleryRenderer } from "./renderers/gallery.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
//let userId2;

function main() {
    let selector = document.querySelector("#jsFotoDetails");

    photosAPI.getById(photoId)
        .then(photos => {
            //userId2.appendChild(photos[0].userId);
            categoriesAPI.getByName(photos[0].category)
                .then(categories => {
                    usersAPI.getById(photos[0].userId)
                        .then(users => {
                            let photoDetails = photoRenderer.asDetails(photos[0], users[0], categories[0]);
                            selector.appendChild(photoDetails);

                            hideOptions(photos[0]);

                            let comentarios = document.querySelector("#jsComentarios");
                            commentsAPI.getByPhoto(photoId)
                                .then(comments => {
                                    let commentsPhotos = galleryRenderer.asPhotoComments(comments);
                                    comentarios.appendChild(commentsPhotos);
                                })
                            let commentForm = document.getElementById("añadirComentario");
                            commentForm.onsubmit = handleSubmitComment;

                            let valorationForm = document.getElementById("añadirValoracion");
                            valorationForm.onsubmit = handleSubmitValoration;

                            let friendForm = document.getElementById("seguirUsuario");
                            friendForm.onsubmit = handleSubmitFriend;

                        })
                        .catch(error => messageRenderer.showErrorMessage(error));
                })
                .catch(error => messageRenderer.showErrorMessage(error));

        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleSubmitValoration(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedId());
    formData.append("photoId", photoId);


    valorationsAPI.create(formData)
        .then(data => window.location.href = window.location.search)
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

function handleSubmitFriend(event) {
    event.preventDefault();


    photosAPI.getById(photoId)
        .then(photos => {
            let form = event.target;
            let formData = new FormData(form);
            formData.append("userId1", sessionManager.getLoggedId());
            formData.append("userId2", photos[0].userId);

            friendsAPI.create(formData)
                .then(data => window.location.href = window.location.search)
                .catch(error => messageRenderer.showErrorMessage(error));
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function hideOptions(photo) {
    let modificar = document.getElementById("modificarBoton");
    console.log(modificar);
    if (sessionManager.getLoggedId() === photo.userId) {
    } else {
        modificar.style.display = "none";

    }
}


document.addEventListener("DOMContentLoaded", main);