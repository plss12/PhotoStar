"use strict";

const insultosValidator = {
    validateComment: function(formData) {
        let insultos=["tonto", "tonta", "culo", "gilipolla", "subnormal", "retrasado", "puta", "guarr", "asqueros"];

        let errors = [];
        let texto=formData.get("text").toLowerCase();
        
        
        for(let i=0; i<insultos.length; i++){
            if (texto.includes(insultos[i])) {
                errors.push("No se puede usar lenguaje inapropiado");
            }
        }
        return errors;

    },
    validateCategoryDescription: function(formData) {
        let insultos=["tonto", "tonta", "culo", "gilipolla", "subnormal", "retrasado", "puta", "guarr", "asqueros"];

        let errors = [];
        let texto=formData.get("descripcion").toLowerCase();
        
        for(let i=0; i<insultos.length; i++){
            if (texto.includes(insultos[i])) {
                errors.push("No se puede usar lenguaje inapropiado");
            }
        }
        return errors;
    },
    validateCategoryName: function(formData) {
        let insultos=["tonto", "tonta", "culo", "gilipolla", "subnormal", "retrasado", "puta", "guarr", "asqueros"];

        let errors = [];
        let texto=formData.get("name").toLowerCase();
        
        for(let i=0; i<insultos.length; i++){
            if (texto.includes(insultos[i])) {
                errors.push("No se puede usar lenguaje inapropiado");
            }
        }
        return errors;
    },
    validatePhotoDescription: function(formData) {
        let insultos=["tonto", "tonta", "culo", "gilipolla", "subnormal", "retrasado", "puta", "guarr", "asqueros"];

        let errors = [];
        let texto=formData.get("description").toLowerCase();
        
        for(let i=0; i<insultos.length; i++){
            if (texto.includes(insultos[i])) {
                errors.push("No se puede usar lenguaje inapropiado");
            }
        }
        return errors;
    },
    validatePhotoName: function(formData) {
        let insultos=["tonto", "tonta", "culo", "gilipolla", "subnormal", "retrasado", "puta", "guarr", "asqueros"];

        let errors = [];
        let texto=formData.get("title").toLowerCase();
        
        for(let i=0; i<insultos.length; i++){
            if (texto.includes(insultos[i])) {
                errors.push("No se puede usar lenguaje inapropiado");
            }
        }
        return errors;
    }
};

export { insultosValidator };