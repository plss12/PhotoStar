"use strict";
import { categoriesAPI } from "/js/api/categories.js";
import { messageRenderer } from "/js/renderers/messages.js";


function main() {

    let categoryForm = document.getElementById("añadirCategoria");
    categoryForm.onsubmit = handleSubmitCategory;
}


function handleSubmitCategory(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    categoriesAPI.create(formData)
        .then(data => window.location.href = "index.html")
        .catch(error => messageRenderer.showErrorMessage(error));
    
}

document.addEventListener("DOMContentLoaded", main);