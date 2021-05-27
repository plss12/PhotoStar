"use strict";
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { categoriesAPI } from "/js/api/categories.js";
import { insultosValidator } from "/js/validators/insultosValidators.js";



function main() {
    let fotoForm = document.getElementById("añadirFoto");
    fotoForm.onsubmit = handleSubmitPhoto;
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
            formData.append("userId", sessionManager.getLoggedId());

            let cateForm = document.getElementById("categoría-input").value;

            if (categorias.includes(""+cateForm+"") || cateForm==="") {
                let errors = insultosValidator.validatePhotoDescription(formData);

                if (errors.length > 0) {
                    let errorsDiv = document.getElementById("errors");
                    errorsDiv.innerHTML = "";
                    for (let error of errors) {
                        messageRenderer.showErrorMessage(error);
                    }
                }
                else {
                    photosAPI.create(formData)
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