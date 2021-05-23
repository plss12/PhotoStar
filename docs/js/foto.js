"use strict"
import { photoRenderer } from "/js/renderers/photo.js" ;
import {photosAPI} from "/js/api/photos.js";
import {categoriesAPI} from "/js/api/categories.js";
import {messageRenderer} from "/js/renderers/messages.js"
import {sessionManager} from "/js/utils/session.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main(){
    let selector=document.querySelector("#jsFotoDetails");
    let user=sessionManager.getLoggedUser();

    photosAPI.getById(photoId)
        .then(photos => {
            categoriesAPI.getByName(photos[0].category)
                .then(categories => {                    
                    let photoDetails= photoRenderer.asDetails(photos[0],user, categories[0]);
            selector.appendChild(photoDetails);
                })
                .catch(error => messageRenderer.showErrorMessage(error));
            
        } )
        .catch( error => messageRenderer.showErrorMessage(error));
}


document.addEventListener( "DOMContentLoaded" , main ) ;