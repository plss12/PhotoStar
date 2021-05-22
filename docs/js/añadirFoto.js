"use strict";
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";



function main() {

    let fotoForm = document.getElementById("añadirFoto");
    fotoForm.onsubmit = handleSubmitPhoto;
}


function handleSubmitPhoto(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedId());


    photosAPI.create(formData)
        .then(data => window.location.href = "index.html")
        .catch(error => messageRenderer.showErrorMessage(error));
    
}

document.addEventListener("DOMContentLoaded", main);