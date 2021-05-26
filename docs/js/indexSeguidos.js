"use strict"
import { galleryRenderer } from "/js/renderers/gallery.js" ;
import { messageRenderer } from "/js/renderers/messages.js" ;
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";
import { friendsAPI } from "/js/api/friends.js";
import { valorationsAPI } from "/js/api/valorations.js";
import { sessionManager } from "/js/utils/session.js";


function main(){
    let content=document.querySelector("#jsFoto");
    photosAPI.getByVisibility("Public")
        .then(photos => {
            friendsAPI.getFollows(sessionManager.getLoggedId())
            .then(users=> {
                let gallery =galleryRenderer.asCardGalleryFollows(photos, users);
                content.appendChild(gallery);
    
                //let valorationForm = document.getElementById("añadirValoracion");
                //valorationForm.onsubmit = handleSubmitValoration;
            })
            .catch(error => messageRenderer.showErrorMessage("No sigues a ningun usuario"));
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

/*function handleSubmitValoration(event) {
    event.preventDefault();

  let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedId());
    formData.append("photoId", photoId);

    valorationsAPI.create(formData)
        .then(data => window.location.href = window.location.search)
        .catch(error => messageRenderer.showErrorMessage(error));
}*/

document.addEventListener("DOMContentLoaded", main)