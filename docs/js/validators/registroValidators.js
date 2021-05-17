"use strict";
const userValidator = {
    validateRegister: function(formData) {
        let errors = [];
    
        let firstName = formData.get("nombre");
        let lastName = formData.get("apellidos");
        let password = formData.get("contraseña");
        let password2 = formData.get("repetirContraseña");
        
        if (firstName.length < 3 || lastName.length < 3) {
            errors.push(" The first and last name should have more than 3 characters ");
        }
        if (password !== password2) {
            errors.push(" The passwords must match ");
        }
        return errors;

    }
};

export { userValidator };