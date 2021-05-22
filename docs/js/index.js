"use strict"
import { galleryRenderer } from "/js/renderers/gallery.js" ;
import { messageRenderer } from "/js/renderers/messages.js" ;
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";

function main(){
    let content=document.querySelector("#jsFoto");
    photosAPI.getAll()
        .then(photos => {
            let gallery =galleryRenderer.asCardGallery(photos);
            content.appendChild(gallery);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    let content2=document.querySelector("#jsCategoria");
    categoriesAPI.getAll()
        .then(categories => {
            let gallery2 =galleryRenderer.asCategoryGallery(categories);
            content2.appendChild(gallery2);
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main)