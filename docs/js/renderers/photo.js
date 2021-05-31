"use strict"
import { parseHTML } from "/js/utils/parseHTML.js";

const photoRenderer = {
    asCard: function (photo, user, category) {
        let categoriaId;
        let categoria;
        if(category===null){
                categoriaId="";
                categoria="";
        }
        else{
                categoriaId='href=/docs/categoria.html?categoryId='+category.categoryId; 
                categoria= photo.category;
        }
        let html = `
        <div class="container"> 
            <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-11 text-center">
                                <div class="row">
                                        <div class="col-md-auto">
                                                <a href="/docs/perfil.html?userId=${user.userId}"><img
                                                                src="${user.avatarUrl}"
                                                                class="photo-user"></a>
                                        </div>
                                        <div class="col-md-auto">
                                                <h4 class="text-center"> ${user.username} </h4>
                                        </div>
                                </div>
                                <h3 class="text-center"> ${photo.title} </h3>
                                <a href="/docs/foto.html?photoId=${photo.photoId}"><img src="${photo.url}"
                                                class="img-ini rounded" width=10></a>
                                <div>
                                        <div class="row">
                                                <div class="col-md">
                                                        <a ${categoriaId}>
                                                                <p class="text-right"> <h4 class="text-right">${categoria} </h4><p>
                                                        </a>
                                                </div>
                                        </div>
                                        <hr>
                                </div>
                        </div>
                </div>
        </div>
        `
        let card = parseHTML(html);
        return card;
    },
    asDetails: function (photo, user, category) {
        let categoriaId;
        let categoria;
        if(category===null){
                categoriaId="";
                categoria="";
        }
        else{
                categoriaId='href=/docs/categoria.html?categoryId='+category.categoryId; 
                categoria= photo.category;
        }
        let html = ` 
                <div class=container>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 text-center">
                        <div class="row">
                            <div class="col-md-auto">
                                <a href="/docs/perfil.html?userId=${user.userId}"><img src="${user.avatarUrl}" class="photo-user"></a>
                            </div>
                            <div class="col-md-auto">
                                <h5 class="text-center"> ${user.username} </h5>
                                <div id="dejarSeguirUsuario">
                                    <form >
                                        <button type="submit" class="btn btn-light"> Siguiendo </button>
                                    </form>
                                </div>
                                <div id="seguirUsuario">
                                <form >
                                    <button type="submit" class="btn btn-secondary"> Seguir </button>
                                </form>
                                </div>
                            </div>
                            <div class="col text-right" id="modificarBoton">
                                <a href="/docs/modificarFoto.html?photoId=${photo.photoId}"><img src="/docs/images/ajustes.png" class="botones"></a>
                            </div>
                        </div>
                        <h5 class="text-center"> ${photo.title} </h5>
                        <a href="/docs/foto.html?photoId=${photo.photoId}"><img src="${photo.url}" class="img-det rounded"></a>
                        <div>
                            <div class="row">
                                <div class="col-md-auto text-left">
                                    <p class="text-left" id="valoracionMedia">  </p>
                                    <p class="text-left" id="tuValoracion">  </p>
                                    <form id="añadirValoracion">
                                        <h2>
                                            <p class="clasificacion">
                                                <input id="radio1" type="radio" name="value" value="5">
                                                <label for="radio1">★</label>
                                                <input id="radio2" type="radio" name="value" value="4">
                                                <label for="radio2">★</label>
                                                <input id="radio3" type="radio" name="value" value="3">
                                                <label for="radio3">★</label>
                                                <input id="radio4" type="radio" name="value" value="2">
                                                <label for="radio4">★</label>
                                                <input id="radio5" type="radio" name="value" value="1">
                                                <label for="radio5">★</label>
                                            </p>
                                        </h2>
                                        <button type="submit" class=" btn btn-secondary btn-block" > Valorar Foto </button>
                                    </form>
                                </div>
                                <div class="col-6 text-center">
                                    <h5> ${photo.description} </h5>
                                </div>
                                <div class="col-md">
                                    <a ${categoriaId}>
                                        <h4 class="text-right"> ${categoria} </h4>
                                    </a>
                                    <p class="text-right"> ${photo.date} </p>
                                </div>
                            </div>
                        </div>
                </div>    
                <div class="d-none d-lg-block col-lg">
            <div class="d-none d-lg-block col-lg-auto text-center">
                <div id="jsComentarios"></div>
                <form id="añadirComentario">
                    <input type="text" class="form-control" id="comentario-input" name="text"
                        placeholder="Añadir Comentario" style="height:100px;">
                    </br>
                    <button type="submit" class=" btn btn-secondary "> Añadir </button>
                </form>
            </div>
        </div>
    </div>
        
                `;
        let photoDetail = parseHTML(html);
        return photoDetail;
    },
    asModify: function (photo) {
        let html = `<a href="/docs/foto.html?photoId=${photo.photoId}"><img src="${photo.url}" class="img-mod rounded" ></a>
            `;
        let photoModify = parseHTML(html);
        return photoModify;
    },
    asAvatarLog: function (textContent) {
        let html = `<img src="${textContent}" class="photo-user"> `;
        let photoAvatar = parseHTML(html);
        return photoAvatar;
    },
    asCategory: function (category) {
        let html = `
            <div class="row text-center">
                    <div>
                        <br/>
                            <a href="/docs/categoria.html?categoryId=${category.categoryId}"><img src="${category.foto}" class="img-cat rounded"></a>
                            <h5 class="text-center"> ${category.name} </h5>
                    </div>
            </div>
            `;
        let categoryCard = parseHTML(html);
        return categoryCard;
    },
    asCategoryDetails: function (photo, user) {
        let html = `<div class="row justify-content-center">
            <div class="col-7 text-center">
                    <div class="row">
                            <div class="col-md-auto">
                                    <a href="/docs/perfil.html?userId=${user.userId}"><img src="${user.avatarUrl}"
                                                    class="photo-user"></a>
                            </div>
                            <div class="col-md-auto">
                                    <h4 class="text-center"> ${user.username} </h4>
                            </div>
                    </div>
                    <h5 class="text-center"> ${photo.title} </h5>
                    <a href="/docs/foto.html?photoId=${photo.photoId}"><img src="${photo.url}"
                                    class="card-img-top rounded"></a>
                    <div>
                            <hr>
                    </div>
            </div>

    </div>
    `;
        let categoria = parseHTML(html);
        return categoria;
    },
    asPerfilDetails: function (photo) {
        let html = `<div class="col-4 text-center">
        <div class="row">
            <div class="col-md text-center">
                <a href="/docs/foto.html?photoId=${photo.photoId}"><img src="${photo.url}" class="img-perf rounded"></a>
            </div>
        </div>
        <div class="row">
            <div class="col-md text-center">
                <h5>${photo.title}</h5>
            </div>
        </div>
    </div>
    `;
        let categoria = parseHTML(html);
        return categoria;
    },
    asComment: function (comment, user) {
        let html = `<div class=container>
                        <div class="row">
                            <div class="col-4">
                                <a href="/docs/perfil.html?userId=${user.userId}"><img src="${user.avatarUrl}" class="photo-user"
                                        width=50></a>
                            </div>
                            <div class="col text-center">
                                <p>${comment.text}</p>
                            </div>
                        </div>
                        <hr>
                    </div>
        `;
        let photoModify = parseHTML(html);
        return photoModify;
    }
};

export { photoRenderer };