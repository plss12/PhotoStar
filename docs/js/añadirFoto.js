"use strict";
import { photosAPI } from "/js/api/photos.js";
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { categoriesAPI } from "/js/api/categories.js";
import { insultosValidator } from "/js/validators/insultosValidators.js";



function main() {
    let catForm = document.querySelector("#categorias");
    categoriesAPI.getAll()
        .then(categories=> {
            for (var i = 0; i < categories.length; i++) {
                let html=parseHTML("<option value="+categories[i].name+">");
                catForm.appendChild(html);
            }
            console.log(catForm)
        })
        .catch(error => messageRenderer.showErrorMessage("Aun no existen categorias debes crear una para subir una foto"));
    
    let fotoForm = document.getElementById("añadirFoto");
    fotoForm.onsubmit = handleSubmitPhoto;


}


function handleSubmitPhoto(event) {
    event.preventDefault();
    if(sessionManager.isLogged()){
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

            if (categorias.includes("" + cateForm + "") || cateForm === "") {
                let error1 = insultosValidator.validatePhotoDescription(formData);
                let error2=insultosValidator.validatePhotoName(formData);
                if ((error1+error2).length > 0) {
                    let errorsDiv = document.getElementById("errors");
                    errorsDiv.innerHTML = "";
                    if(error1.length>0){
                        messageRenderer.showErrorMessage(error1);
                    }
                    if(error2.length>0){
                        messageRenderer.showErrorMessage(error2);
                    }
                }
                else {
                    photosAPI.getByUser(sessionManager.getLoggedId())
                        .then(photos => {
                            if (photos.length < 50) {
                                photosAPI.create(formData)
                                    .then(data => window.location.href = "index.html")
                                    .catch(error => messageRenderer.showErrorMessage(error));
                            } else {
                                messageRenderer.showErrorMessage("Un usuario no puede tener mas de 50 fotos");
                            }
                        })
                        .catch(error => {
                            photosAPI.create(formData)
                                .then(data => window.location.href = "index.html")
                                .catch(error => messageRenderer.showErrorMessage(error));
                        })
                }
            }
            else {
                messageRenderer.showErrorMessage("La categoria que quieres introducir no existe");
            }
        })
        .catch(error => messageRenderer.showErrorMessage("Aun no existen categorias debes crear una para subir una foto"));
    }
    else{
        messageRenderer.showErrorMessage("No estas registrado")
    }
    
}

document.addEventListener("DOMContentLoaded", main);