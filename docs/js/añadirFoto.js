"use strict";
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {

    let registerForm = document.getElementById("añadirFoto");
    registerForm.onsubmit = handleSubmitPhoto;
}


function handleSubmitPhoto(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    // Add the current user ID
    formData.append("userId", 1);

    photosAPI.create(formData)
        .then(data => window.location.href = "index.html")
        .catch(error => messageRenderer.showErrorMessage(error));
    
}

document.addEventListener("DOMContentLoaded", main);