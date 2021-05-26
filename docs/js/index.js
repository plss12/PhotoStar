"use strict"
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";
import { valorationsAPI } from "/js/api/valorations.js";

function main() {
    let content = document.querySelector("#jsFoto");
    photosAPI.getByVisibility("Public")
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            content.appendChild(gallery);

            //let valorationForm = document.getElementById("añadirValoracion");
            //valorationForm.onsubmit = handleSubmitValoration;
        })
        .catch(error => messageRenderer.showErrorMessage(error));

    let content2 = document.querySelector("#jsCategoria");
    categoriesAPI.getAll()
        .then(categories => {
            let formulario = document.querySelector("#buscador")
            const texto = formulario.value.toLowerCase();
            console.log(texto);
            if(texto !==""){
                const categoriasFiltradas=[];
                for (var i=0; i<=categories.length; i++){
                    let nombre = categories[i].name.toLowerCase();
                    if (nombre.indexOf(texto) !== 1) {
                        categoriasFiltradas.push(categories[i]);
                    }
                }
            }
            else{
                let gallery2 = galleryRenderer.asCategoryGallery(categories);
                content2.appendChild(gallery2);
            }
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}

/*function handleSubmitValoration(event) {
    event.preventDefault();

  let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", sessionManager.getLoggedId());
    formData.append("photoId", photoId);

    valorationsAPI.create(formData)
        .then(data => window.location.href = window.location.search)
        .catch(error => messageRenderer.showErrorMessage(error));
}*/
function buscador(categories){
    

    const filtrar = () => {
        const texto = formulario.value.toLowerCase();
        for (categorie of categories) {
            let nombre = categorie.name.toLowerCase();
            if (nombre.indexOf(texto) !== 1) {
                content2 = categorie.name;
            }
        }


    }
    boton.addEventListener("click", filtrar);
    
}

document.addEventListener("DOMContentLoaded", main)