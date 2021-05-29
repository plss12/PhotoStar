"use strict";
import { photosAPI } from "/js/api/photos.js";
import { usersAPI } from "/js/api/users.js";
import { friendsAPI } from "/js/api/friends.js";
import { sessionManager } from "/js/utils/session.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { valorationsAPI } from "/js/api/valorations.js";


let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");

function main() {
    let user;

    if (userId === null || userId === sessionManager.getLoggedId()) {
        user = sessionManager.getLoggedUser();
        showUser(user);
        showAvatar(user);
        showNumFotos(user);
        showPhotosAll(user);
        showFollowFollowers(user);
        hideFollow(user);
        loadMediaValoration();
    }
    else {
        usersAPI.getById(userId).then(users => {
            showUser(users[0]);
            showAvatar(users[0]);
            showNumFotosPerf(users[0]);
            showPhotos(users[0]);
            showFollowFollowers(users[0]);
            hideFollow(users[0]);
            loadMediaValoration();

            let friendForm = document.getElementById("seguirUsuario");
            friendForm.onsubmit = handleSubmitFriend;

            let deleteFriendForm = document.getElementById("dejarSeguirUsuario");
            deleteFriendForm.onsubmit = handleSubmitDeleteFriend;
        })
            .catch(error => messageRenderer.showErrorMessage(error));

    }


}

function showPhotosAll(user) {
    let selector = document.querySelector("#jsPerfil");
    photosAPI.getByUser(user.userId)
        .then(photos => {
            let perfilDetails = galleryRenderer.asPerfilDetails(photos, user.userId);
            selector.appendChild(perfilDetails);
        })
}

function showPhotos(user) {
    let selector = document.querySelector("#jsPerfil");
    photosAPI.getByUser(user.userId)
        .then(photos => {
            let perfilDetails = galleryRenderer.asPerfilDetails(photos);
            selector.appendChild(perfilDetails);
        })
}

function showUser(user) {
    let username = document.getElementById("userUsuario");
    let nombre = document.getElementById("nameUsuario");
    let correo = document.getElementById("emailUsuario");
    let seguidores = document.getElementById("seguidoresUsuario");
    let seguidos = document.getElementById("seguidosUsuario");
    let valoracion = document.getElementById("valoracionUsuario");
    let text1;
    let text2;
    let text3;
    let text4;
    let text5;
    let text6;

    let usern = user.username;
    text1 = usern;
    let name = user.firstName + " " + user.lastName;
    text2 = name;
    let email = user.email;
    text3 = email;
    let follows = user.follows;
    text4 = follows;
    let followers = user.followers;
    text5 = followers;
    if (user.valoration === null) {
        let valoration = "0 ★";
        text6 = valoration;
    }
    else {
        let valoration = user.valoration + "  ★";
        text6 = valoration;
    }

    username.textContent = text1;
    nombre.textContent = text2;
    correo.textContent = text3;
    seguidores.textContent = text4;
    seguidos.textContent = text5;
    valoracion.textContent = text6;



}
function showAvatar(user) {
    let selector = document.querySelector("#fotoUsuario");
    let img;
    let avatar = user.avatarUrl;
    img = avatar;
    selector.src = img;
}

function showNumFotos(user) {
    let selector = document.getElementById("numFotos");
    photosAPI.getByUser(user.userId)
        .then(photos => {
            let num = photos.length + " fotos";
            selector.textContent = num;
        })
        .catch(selector.textContent = 0 + " fotos");
}

function showNumFotosPerf(user) {
    let selector = document.getElementById("numFotos");
    let i = 0;
    photosAPI.getByUser(user.userId)
        .then(photos => {
            for (let x = 0; x < photos.length; x++) {
                if (photos[x].visibility === "Public") {
                    i = i + 1;
                }
            }
            let num = i + " fotos";
            selector.textContent = num;
        })
        .catch(selector.textContent = 0 + " fotos");
}

function showFollowFollowers(user) {
    let selector1 = document.getElementById("seguidosUsuario");
    let selector2 = document.getElementById("seguidoresUsuario");

    friendsAPI.getFollows(user.userId)
        .then(users => {
            let foll = users.length;
            selector1.textContent = foll;
        })
        .catch(selector1.textContent = 0);


    friendsAPI.getFollowers(user.userId)
        .then(users => {
            let foll = users.length;
            selector2.textContent = foll;
        })
        .catch(selector2.textContent = 0);
}


function handleSubmitFriend(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId1", sessionManager.getLoggedId());
    formData.append("userId2", userId);

    friendsAPI.create(formData)
        .then(data => window.location.href = window.location.search)
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleSubmitDeleteFriend(event) {
    event.preventDefault();

    friendsAPI.delete(sessionManager.getLoggedId(), userId)
        .then(data => window.location.href = window.location.search)
        .catch(error => messageRenderer.showErrorMessage(error));
}

function hideFollow(user) {
    let seguir = document.getElementById("seguirUsuario");
    let dejarSeguir = document.getElementById("dejarSeguirUsuario");

    if (sessionManager.getLoggedId() === user.userId) {
        seguir.style.display = "none";
        dejarSeguir.style.display = "none";
    }
    friendsAPI.getFollows(sessionManager.getLoggedId())
        .then(friends => {
            const ids = [];
            for (let i = 0; i < friends; i++) {
                ids.push(friends[i].userId2);
            }
            if (ids.includes(user.userId)) {
                dejarSeguir.style.display = "none";
            }
            else {
                seguir.style.display = "none";
            }
        })
        .catch(error => {
            dejarSeguir.style.display = "none";
        });
}

function loadMediaValoration() {
    let valoracion = document.getElementById("valoracionUsuario");

    photosAPI.getByUser(userId)
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
                        valoracion.textContent = (valMed / photos.length + "★");
                    })
                    .catch(error =>{
                        valoracion.textContent = 0 + "★";
                    })
            }
        })
        .catch(error =>{
            valoracion.textContent = 0 + "★";
        })
}


document.addEventListener("DOMContentLoaded", main);