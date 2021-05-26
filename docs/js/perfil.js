"use strict";
import {photosAPI} from "/js/api/photos.js";
import {usersAPI} from "/js/api/users.js";
import {friendsAPI} from "/js/api/friends.js";
import {sessionManager} from "/js/utils/session.js";
import {galleryRenderer} from "/js/renderers/gallery.js" ;
import { messageRenderer } from "/js/renderers/messages.js" ;



function main() {
    let user;
    let urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get("userId");
    if(userId===null){
        user=sessionManager.getLoggedUser();
        showUser(user);
        showAvatar(user);
        showNumFotos(user);
        showPhotosAll(user);
        showFollowFollowers(user);
    }
    else{
        usersAPI.getById(userId).then(users => {
            showUser(users[0]);
            showAvatar(users[0]);
            showNumFotosPerf(users[0]);
            showPhotos(users[0]);
            showFollowFollowers(users[0]);
        } )
        .catch( error => messageRenderer.showErrorMessage(error));

    }


}

function showPhotosAll(user){
    let selector=document.querySelector("#jsPerfil");
    photosAPI.getByUser(user.userId)
            .then(photos => {
                let perfilDetails= galleryRenderer.asPerfilDetails(photos, user.userId);
                selector.appendChild(perfilDetails);
            } )
}

function showPhotos(user){
    let selector=document.querySelector("#jsPerfil");
    photosAPI.getByUser(user.userId)
            .then(photos => {
                let perfilDetails= galleryRenderer.asPerfilDetails(photos);
                selector.appendChild(perfilDetails);
            } )
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
    let name=user.firstName+" "+user.lastName;
    text2 = name;
    let email=user.email;
    text3 = email;
    let follows=user.follows;
    text4 = follows;
    let followers=user.followers;
    text5 = followers;
    if(user.valoration===null){
        let valoration="0 ★";
        text6 = valoration;
    }
    else{
        let valoration=user.valoration+"  ★";
        text6 = valoration;
    }
    
    username.textContent = text1;
    nombre.textContent = text2;
    correo.textContent = text3;
    seguidores.textContent = text4;
    seguidos.textContent = text5;
    valoracion.textContent = text6;

    

}
function showAvatar(user){
    let selector = document.querySelector("#fotoUsuario");
    let img;
    let avatar = user.avatarUrl;
    img = avatar;
    selector.src=img;
}

function showNumFotos(user){
    let selector = document.getElementById("numFotos");
    photosAPI.getByUser(user.userId)
    .then(photos => {
        let num= photos.length+" fotos";
        selector.textContent=num;
    } )
    .catch(selector.textContent=0+" fotos");
}

function showNumFotosPerf(user){
    let selector = document.getElementById("numFotos");
    let i=0;
    photosAPI.getByUser(user.userId)
    .then(photos => {
        for (let x=0; x<photos.length; x++){
            console.log(photos[x].visibility);
            if(photos[x].visibility==="Public"){
                i=i+1;
            }
        }
        let num= i+" fotos";
        selector.textContent=num;
    } )
    .catch(selector.textContent=0+" fotos");
}

function showFollowFollowers(user){
    let selector1 = document.getElementById("seguidosUsuario");
    let selector2 = document.getElementById("seguidoresUsuario");

    friendsAPI.getFollows(user.userId)
    .then(users => {
        let foll= users.length;
        selector1.textContent=foll;
    } )
    .catch(selector1.textContent=0);


    friendsAPI.getFollowers(user.userId)
    .then(users => {
        let foll= users.length;
        selector2.textContent=foll;
    } )
    .catch(selector2.textContent=0);
}


document.addEventListener("DOMContentLoaded", main);