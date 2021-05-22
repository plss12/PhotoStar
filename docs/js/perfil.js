"use strict";
import {photosAPI} from "/js/api/photos.js";
import {sessionManager} from "/js/utils/session.js";
import {galleryRenderer} from "/js/renderers/gallery.js" ;


let user = sessionManager.getLoggedUser().userId;

function main() {
    showUser();
    showAvatar();
    showNumFotos();
    let selector=document.querySelector("#jsPerfil");
    
    photosAPI.getByUser(user)
        .then(photos => {
            let perfilDetails= galleryRenderer.asPerfilDetails(photos);
            selector.appendChild(perfilDetails);
        } )
        .catch( error => messageRenderer.showErrorMessage(error));
}

function showUser() {
    let user = document.getElementById("userUsuario");
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

    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().username;
        text1 = username;
        let name=sessionManager.getLoggedUser().firstName+" "+sessionManager.getLoggedUser().lastName;
        text2 = name;
        let email=sessionManager.getLoggedUser().email;
        text3 = email;
        let follows=sessionManager.getLoggedUser().follows;
        text4 = follows;
        let followers=sessionManager.getLoggedUser().followers;
        text5 = followers;
        let valoration=sessionManager.getLoggedUser().valoration+"  ★";
        text6 = valoration;

    }
    user.textContent = text1;
    nombre.textContent = text2;
    correo.textContent = text3;
    seguidores.textContent = text4;
    seguidos.textContent = text5;
    valoracion.textContent = text6;

    

}
function showAvatar(){
    let selector = document.querySelector("#fotoUsuario");
    let img;
    if (sessionManager.isLogged()) {
        let avatar = sessionManager.getLoggedUser().avatarUrl;
        img = avatar;
    }
    selector.src=img;
}

function showNumFotos(){
    let selector = document.getElementById("numFotos");
    let num;
    if (sessionManager.isLogged()) {
        let phNum=(photosAPI.getByUser(user).catch.length+1)+' fotos';
        console.log(phNum);
        num= phNum;
    }
    selector.textContent=num;
}


document.addEventListener("DOMContentLoaded", main);