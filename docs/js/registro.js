"use strict";
import { messageRenderer } from "/js/renderers/messages.js" ;
import { userValidator } from "/js/validators/registroValidators.js" ;
import { authAPI } from "/js/api/auth.js";
import { sessionManager } from "/js/utils/session.js";

function main(){
    let form=document.getElementById("formularioRegistro");
    form.onsubmit = formHandler;
}

function formHandler(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form); 

    let errors = userValidator.validateRegister(formData);
    
    if (errors.length > 0){
        let errorsDiv=document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for(let error of errors){
            messageRenderer.showErrorMessage(error);
        }
    }
    else {
        sendRegister(formData);
    }
}

function sendRegister(formData) {
    authAPI.register(formData)
        .then(loginData => {
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;
            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html";
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded",main);