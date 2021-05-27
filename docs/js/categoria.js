"use strict"
import {photosAPI} from "/js/api/photos.js";
import {categoriesAPI} from "/js/api/categories.js";
import {messageRenderer} from "/js/renderers/messages.js"
import {galleryRenderer} from "/js/renderers/gallery.js" ;
import { sessionManager } from "/js/utils/session.js";

function main(){
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get("categoryId");
    categoriesAPI.getById(categoryId)
        .then(categories => {
            let nombre = document.getElementById("nombreCat");
            let name= categories[0].name;
            nombre.textContent=name;
            if(sessionManager.isLogged()){
                let deleteBtn = document.querySelector("#button-delete");
                deleteBtn.onclick = handleDelete;
            }
            photosCategory(name);
        } )
        .catch( error => messageRenderer.showErrorMessage(error));
}

function handleDelete(event) {
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get("categoryId");
    let answer = confirm("¿Estas seguro de que quieres eliminar la categoría?");
    if (answer) {
        categoriesAPI.delete(categoryId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

function photosCategory(name){
    let selector=document.querySelector("#jsCategoriaDetails");
    
    photosAPI.getByCategory(name)
        .then(photos => {
            let categoryDetails= galleryRenderer.asCategoryDetails(photos);
            selector.appendChild(categoryDetails);
        } )
        .catch( error => messageRenderer.showErrorMessage("Esta categoria no tiene fotos"));
}


document.addEventListener( "DOMContentLoaded" , main ) ;