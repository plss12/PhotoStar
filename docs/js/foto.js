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
import { insultosValidator } from "/js/validators/insultosValidators.js";



let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
//let userId2;

function main() {
    let selector = document.querySelector("#jsFotoDetails");

    photosAPI.getById(photoId)
        .then(photos => {
            if (photos[0].visibility === "Public" || photos[0].userId === sessionManager.getLoggedId()) {
                //userId2.appendChild(photos[0].userId);
                usersAPI.getById(photos[0].userId)
                    .then(users => {
                        categoriesAPI.getByName(photos[0].category)
                            .then(categories => {

                                let photoDetails = photoRenderer.asDetails(photos[0], users[0], categories[0]);
                                selector.appendChild(photoDetails);

                                hideOptions(photos[0]);
                                hideFollow(photos[0]);
                                loadValoration();
                                loadMediaValoration();

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

                                let deleteFriendForm = document.getElementById("dejarSeguirUsuario");
                                deleteFriendForm.onsubmit = handleSubmitDeleteFriend;

                            })
                            .catch(error => {
                                let photoDetails = photoRenderer.asDetails(photos[0], users[0], null);
                                selector.appendChild(photoDetails);
                                hideOptions(photos[0]);
                                hideFollow(photos[0]);
                                loadValoration();
                                loadMediaValoration();

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

                                let deleteFriendForm = document.getElementById("dejarSeguirUsuario");
                                deleteFriendForm.onsubmit = handleSubmitDeleteFriend;
                            });
                    })
                    .catch(error => messageRenderer.showErrorMessage(error));
            }
            else {
                messageRenderer.showErrorMessage("Esta foto es privada")
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleSubmitValoration(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedId());
    formData.append("photoId", photoId);

    valorationsAPI.getByPhotoUser(photoId, sessionManager.getLoggedId())
        .then(valorations=>{
                valorationsAPI.update(valorations[0].valorationId, formData)
                .then(data => window.location.href = window.location.search)
                .catch(error => messageRenderer.showErrorMessage(error));
        })
        .catch(error => {
            valorationsAPI.create(formData)
            .then(data => window.location.href = window.location.search)
            .catch(error => messageRenderer.showErrorMessage(error));
        });

}

function loadValoration(){
    let valoracion = document.getElementsByName("value");

    valorationsAPI.getByPhotoUser(photoId, sessionManager.getLoggedId())
            .then(valorations => {
                console.log(valoracion);
                 valoracion.value=valorations[0].value;
        })
}

function loadMediaValoration(){
    let valoracion = document.getElementById("valoracionMedia");

    valorationsAPI.getByPhoto(photoId)
            .then(valorations => {
                let val=0;
                for(let i=0; i<valorations.length; i++){
                    val+=valorations[i].value;
                }
                valoracion.textContent=("La valoración media es de "+(val/valorations.length)+"★");
        })
        .catch(error =>{
            valoracion.textContent=("Aun no tiene valoraciones");
        })
}

function handleSubmitComment(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedId());
    formData.append("photoId", photoId);

    let errors = insultosValidator.validateComment(formData);

    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    else {
        commentsAPI.create(formData)
            .then(data => window.location.href = window.location.search)
            .catch(error => messageRenderer.showErrorMessage(error));
    }
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

function handleSubmitDeleteFriend(event) {
    event.preventDefault();


    photosAPI.getById(photoId)
        .then(photos => {
            friendsAPI.delete(sessionManager.getLoggedId(), photos[0].userId)
                .then(data => window.location.href = window.location.search)
                .catch(error => messageRenderer.showErrorMessage(error));
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function hideOptions(photo) {
    let modificar = document.getElementById("modificarBoton");
    if (sessionManager.getLoggedId() === photo.userId) {
    } else {
        modificar.style.display = "none";
    }
}

function hideFollow(photo) {
    let seguir = document.getElementById("seguirUsuario");
    let dejarSeguir = document.getElementById("dejarSeguirUsuario");

    if (sessionManager.getLoggedId() === photo.userId) {
        seguir.style.display = "none";
        dejarSeguir.style.display = "none";
    }
    friendsAPI.getFollows(sessionManager.getLoggedId())
        .then(friends =>{
            const ids=[];
            for(let i=0; i<friends; i++ ){
                ids.push(friends[i].userId2);
            }
            if(ids.includes(photo.userId)){
                dejarSeguir.style.display = "none";
            }
            else{
                seguir.style.display = "none";
            }
        })
        .catch(error =>{
            dejarSeguir.style.display = "none";
        }); 
}


document.addEventListener("DOMContentLoaded", main);