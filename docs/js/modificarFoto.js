"use strict";
import { photosAPI } from "/js/api/photos.js";
import { photoRenderer } from "/js/renderers/photo.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {
    let selector = document.querySelector("#jsModifyPhoto");

    photosAPI.getById(photoId)
        .then(photos => {
            let photoModify = photoRenderer.asModify(photos[0]);
            selector.appendChild(photoModify);
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    if (photoId !== null) {
        loadCurrentPhoto();
    }
    let registerForm = document.getElementById("modificarFoto");
    registerForm.onsubmit = handleSubmitPhoto;

    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;
}

function handleDelete(event) {
    let answer = confirm("Ain't delete the photo?");
    if (answer) {
        photosAPI.delete(photoId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}

function loadCurrentPhoto() {
    let tituloInput = document.getElementById("input-title");
    let descripcionInput = document.getElementById("input-description");
    let categoriaInput = document.getElementById("input-category");

    photosAPI.getById(photoId)
        .then(photos => {
            currentPhoto = photos[0];
            tituloInput.value = currentPhoto.title;
            descripcionInput.value = currentPhoto.description;
            categoriaInput.value = currentPhoto.category;
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleSubmitPhoto(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    formData.append("userId", currentPhoto.userId);

    photosAPI.update(photoId, formData)
        .then(data => window.location.href = "index.html")
        .catch(error => messageRenderer.showErrorMessage(error));

}

document.addEventListener("DOMContentLoaded", main);