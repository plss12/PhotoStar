"use strict";

import { sessionManager } from "/js/utils/session.js";

function main() {
    showUser();
    showAvatar();
    addLogoutHandler();
    hideHeaderOptions();
}

function hideHeaderOptions() {
    let headerFoto = document.getElementById("navbarFoto");
    let headerCategoria = document.getElementById("navbarCategoria");
    let headerPerfil=document.getElementById("navbarPerfil");

    if (sessionManager.isLogged()) {        
    } else {
        headerCategoria.style.display = "none";
        headerFoto.style.display = "none";
        headerPerfil.style.display="none";

    }
}

function addLogoutHandler() {
    let logoutButton = document.getElementById("navbarLog");

    logoutButton.addEventListener("click", function() {
        sessionManager.logout();
        window.location.href = "index.html";
    });
}

function showUser() {
    let title = document.getElementById("nombreUsuario");
    let text;
    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().username;
        text = username;
    }
    title.textContent = text;
}
function showAvatar(){
    let selector = document.querySelector("#jsUserAvatar");
    let img;
    if (sessionManager.isLogged()) {
        let avatar = sessionManager.getLoggedUser().avatarUrl;
        img = avatar;
    }
    selector.src=img;
}

document.addEventListener("DOMContentLoaded", main);