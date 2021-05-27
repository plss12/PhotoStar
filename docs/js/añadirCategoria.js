"use strict";
import { categoriesAPI } from "/js/api/categories.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { insultosValidator } from "/js/validators/insultosValidators.js";
import { sessionManager } from "/js/utils/session.js";


function main() {

    let categoryForm = document.getElementById("añadirCategoria");
    if(sessionManager.isLogged()){
        categoryForm.onsubmit = handleSubmitCategory;
    }
}


function handleSubmitCategory(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    let errors = insultosValidator.validateCategoryDescription(formData);

    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    else {
        categoriesAPI.create(formData)
        .then(data => window.location.href = "index.html")
        .catch(error => messageRenderer.showErrorMessage(error));
    }
}

document.addEventListener("DOMContentLoaded", main);