"use strict"
import { parseHTML } from "/js/utils/parseHTML.js" ;
import { photoRenderer } from "/js/renderers/photo.js" ;

const galleryRenderer ={
    asCardGallery: function (photos){
        let galleryContainer = parseHTML ( '<div class= "photo-gallery" > </div>');
        
        for(let photo of photos){
            let card=photoRenderer.asCard(photo);
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
        let html=parseHTML(nombre);
        let galleryContainer3=parseHTML('<div class= "categoryDetails-gallery"><br/> <h1 class="text-center">'+ nombre+'</h1><br/> </div>');
        
        for(let photo of photos){
            let catDet=photoRenderer.asCategoryDetails(photo);
            galleryContainer3.prepend(catDet);
        }
        return galleryContainer3;
    },
    asPerfilDetails: function (photos){
        let galleryContainer=parseHTML('<div class= "perfilDetails-gallery"></div>');
        let row = parseHTML ( '<div class= "row"> </div >') ;
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