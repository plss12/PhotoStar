"use strict";
import { messageRenderer } from "/js/renderers/messages.js" ;
import { userValidator } from "/js/validators/validators.js" ;

function main(){
    let form=document.getElementById("form_reg");
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
           // errorsDiv.innerHTML += "<div>"+error+"</div>";
            messageRenderer.showErrorMessage(error);
        }
    }
}

document.addEventListener("DOMContentLoaded",main);