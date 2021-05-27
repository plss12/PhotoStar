"use strict";
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";
import { photoRenderer } from "/js/renderers/photo.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { insultosValidator } from "/js/validators/insultosValidators.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {
    let selector = document.querySelector("#jsModifyPhoto");

    photosAPI.getById(photoId)
        .then(photos => {
            let photoModify = photoRenderer.asModify(photos[0]);
            selector.appendChild(photoModify);

            if (sessionManager.getLoggedId() === photos[0].userId) {
                loadCurrentPhoto();

                let registerForm = document.getElementById("modificarFoto");
                registerForm.onsubmit = handleSubmitPhoto;

                let deleteBtn = document.querySelector("#button-delete");
                deleteBtn.onclick = handleDelete;
            }
            else {
                let registerForm = document.getElementById("modificarFoto");
                registerForm.onsubmit = messageRenderer.showErrorMessage("Esta foto no es tuya");
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleDelete(event) {
    let answer = confirm("¿Estas seguro de que quieres eliminar la foto?");
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
    let visibilityInput = document.getElementById("input-visibility");

    photosAPI.getById(photoId)
        .then(photos => {
            currentPhoto = photos[0];
            tituloInput.value = currentPhoto.title;
            descripcionInput.value = currentPhoto.description;
            categoriaInput.value = currentPhoto.category;
            visibilityInput.value = currentPhoto.visibility;

        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

function handleSubmitPhoto(event) {
    event.preventDefault();

    categoriesAPI.getAll()
        .then(categories => {
            const categorias = [];
            for (var i = 0; i < categories.length; i++) {
                categorias.push(categories[i].name);
            }

            let form = event.target;
            let formData = new FormData(form);

            formData.append("userId", currentPhoto.userId);
            formData.append("url", currentPhoto.url);
            formData.append("date", currentPhoto.date);

            let cateForm = document.getElementById("input-category").value;

            if (categorias.includes("" + cateForm + "")) {
                let errors = insultosValidator.validatePhotoDescription(formData);

                if (errors.length > 0) {
                    let errorsDiv = document.getElementById("errors");
                    errorsDiv.innerHTML = "";
                    for (let error of errors) {
                        messageRenderer.showErrorMessage(error);
                    }
                }
                else {
                    photosAPI.update(photoId, formData)
                    .then(data => window.location.href = "index.html")
                    .catch(error => messageRenderer.showErrorMessage(error));
                }
            }
            else {
                messageRenderer.showErrorMessage("La categoria que quieres introducir no existe");
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);