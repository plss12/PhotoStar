"use strict"
import {photosAPI} from "/js/api/photos.js";
import {categoriesAPI} from "/js/api/categories.js";
import {messageRenderer} from "/js/renderers/messages.js"
import {galleryRenderer} from "/js/renderers/gallery.js" ;

let urlParams = new URLSearchParams(window.location.search);
let categoryId = urlParams.get("categoryId");
let categoryName=categoriesAPI.getById(categoryId);
function main(){
    let selector=document.querySelector("#jsCategoriaDetails");
    
    photosAPI.getByCategory('Coches')
        .then(photos => {
            let categoryDetails= galleryRenderer.asCategoryDetails(photos);
            selector.appendChild(categoryDetails);
        } )
        .catch( error => messageRenderer.showErrorMessage(error));
}


document.addEventListener( "DOMContentLoaded" , main ) ;