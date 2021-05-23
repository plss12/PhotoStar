"use strict"
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { photoRenderer } from "/js/renderers/photo.js" ;
import { usersAPI } from "/js/api/users.js";
import { categoriesAPI } from "/js/api/categories.js";



const galleryRenderer ={
    asCardGallery: function (photos){
        let galleryContainer = parseHTML ( '<div class= "photo-gallery" > </div>');
        for(let photo of photos){
            usersAPI.getById(photo.userId)
            .then(users => {
                categoriesAPI.getByName(photo.category)
                .then(categories => {                    
                    let card=photoRenderer.asCard(photo, users[0], categories[0]);
                    galleryContainer.prepend(card);
                })
                .catch(error => messageRenderer.showErrorMessage(error));
            })
            .catch(error => messageRenderer.showErrorMessage(error));
        }
        return galleryContainer;
    },

    asCategoryGallery: function (categories){
        let galleryContainer2=parseHTML('<div class= "category-gallery" > </div>');
    
        for(let category of categories){
            let cat=photoRenderer.asCategory(category);
            galleryContainer2.appendChild(cat);
        }
        return galleryContainer2;
    },
    asCategoryDetails: function (photos){
        let nombre=photos[0].category;
        let galleryContainer=parseHTML('<div class= "categoryDetails-gallery"></div>');
        let galleryContainer1=parseHTML('<div class= "categoryDetails-photos"></div>');
        let galleryContainer2=parseHTML('<div class= "categoryDetails-name"><div><br/> <h1 class="text-center">'+nombre+'</h1><br/><div></div>');
        for(let photo of photos){
            usersAPI.getById(photo.userId)
            .then(users => {
                let catDet=photoRenderer.asCategoryDetails(photo, users[0]);
                galleryContainer1.prepend(catDet);
            })
            .catch(error => messageRenderer.showErrorMessage(error));
        }
        galleryContainer.append(galleryContainer2);
        galleryContainer.append(galleryContainer1);
        return galleryContainer;
    },
    asPerfilDetails: function (photos){
        let galleryContainer=parseHTML('<div class= "col-12 perfilDetails-gallery"></div>');
        let row = parseHTML ( '<div class="row"> </div >') ;
        galleryContainer.appendChild(row) ;
        
        let counter=0;

        for(let photo of photos){
            let perCat=photoRenderer.asPerfilDetails(photo);
            row.prepend(perCat);
            counter+=1;

            if( counter % 3 === 0){
                row = parseHTML ( '<div class= "row"> </div >') ;
                galleryContainer.prepend(row) ;

            }
        }
        return galleryContainer;
    }
};

export {galleryRenderer};