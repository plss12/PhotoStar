"use strict"
import {photosAPI} from "/js/api/photos.js";
import {categoriesAPI} from "/js/api/categories.js";
import {messageRenderer} from "/js/renderers/messages.js"
import {galleryRenderer} from "/js/renderers/gallery.js" ;

function main(){
    let urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get("categoryId");
    categoriesAPI.getById(categoryId)
        .then(categories => {
            let name= categories[0].name;
            console.log(name);
            photosCategory(name);
        } )
        .catch( error => messageRenderer.showErrorMessage(error));
}

function photosCategory(name){
    let selector=document.querySelector("#jsCategoriaDetails");
    
    photosAPI.getByCategory(name)
        .then(photos => {
            let categoryDetails= galleryRenderer.asCategoryDetails(photos);
            selector.appendChild(categoryDetails);
        } )
        .catch( error => messageRenderer.showErrorMessage(error));
}


document.addEventListener( "DOMContentLoaded" , main ) ;