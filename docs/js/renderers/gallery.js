"use strict"
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { photoRenderer } from "/js/renderers/photo.js" ;
import { sessionManager } from "/js/utils/session.js";
import { usersAPI } from "/js/api/users.js";


const galleryRenderer ={
    asCardGallery: function (photos){
        let galleryContainer = parseHTML ( '<div class= "photo-gallery" > </div>');
        for(let photo of photos){
            let user=usersAPI.getById(photo.userId);
            console.log(user);
            let card=photoRenderer.asCard(photo, user);
            galleryContainer.prepend(card);
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
        let galleryContainer=parseHTML('<div class= "categoryDetails-name"></div>');
        let galleryContainer2=parseHTML('<div class= "categoryDetails-name"><div><br/> <h1 class="text-center">'+nombre+'</h1><br/><div></div>');
        for(let photo of photos){
            let user=sessionManager.getLoggedUser();
            let catDet=photoRenderer.asCategoryDetails(photo, user);
            galleryContainer.prepend(catDet);
        }
        galleryContainer.prepend(galleryContainer2);
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