"use strict"
import { parseHTML } from "/js/utils/parseHTML.js";

const photoRenderer = {
    asCard: function (photo) {
        let html = `
        <div class="container"> 
        <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-11 text-center">
                                <div class="row">
                                        <div class="col-md-auto">
                                                <a href="/docs/perfil.html"><img
                                                                src="/docs/images/User.png"
                                                                class="photo-user"></a>
                                        </div>
                                        <div class="col-md-auto">
                                                <h5 class="text-center"> Usuario </h5>
                                                <button type="button" class=" btn btn-secondary ">
                                                        Siguiendo
                                                </button>
                                        </div>
                                </div>
                                <h5 class="text-center"> ${photo.title} </h5>
                                <a href="/docs/foto.html?photoId=${photo.photoId}"><img src="${photo.url}"
                                                class="img-ini rounded" width=10></a>
                                <div>
                                        <div class="row">
                                                <div class="col-md-auto text-left">
                                                        <p class="text-left"> Tu valoración: </p>
                                                        <form>
                                                                <h2>
                                                                        <p class="clasificacion">
                                                                                <input id="radio1"
                                                                                        type="radio"
                                                                                        name="estrellas"
                                                                                        value="5">
                                                                                <label
                                                                                        for="radio1">★</label>
                                                                                <input id="radio2"
                                                                                        type="radio"
                                                                                        name="estrellas"
                                                                                        value="4">
                                                                                <label
                                                                                        for="radio2">★</label>
                                                                                <input id="radio3"
                                                                                        type="radio"
                                                                                        name="estrellas"
                                                                                        value="3">
                                                                                <label
                                                                                        for="radio3">★</label>
                                                                                <input id="radio4"
                                                                                        type="radio"
                                                                                        name="estrellas"
                                                                                        value="2">
                                                                                <label
                                                                                        for="radio4">★</label>
                                                                                <input id="radio5"
                                                                                        type="radio"
                                                                                        name="estrellas"
                                                                                        value="1">
                                                                                <label
                                                                                        for="radio5">★</label>
                                                                        </p>
                                                                </h2>
                                                        </form>
                                                        <p class="text-left"> 5★ Estrellas de media </p>
                                                </div>
                                                <div class="col-md">
                                                        <a href="/docs/categoria.html">
                                                                <p class="text-right"> ${photo.category} </p>
                                                        </a>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <div class="d-none d-lg-block col-lg">
                                <div class="verticalLine" style="height: 1200px; width: px;"></div>
                        </div>
                </div>
        </div>
        `
        let card = parseHTML(html);
        return card;
    },
    asDetails: function (photo) {
        let html = ` 
                <div class=container>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 text-center">
                        <div class="row">
                            <div class="col-md-auto">
                                <a href="/docs/perfil.html"><img src="/docs/images/User.png" class="photo-user"></a>
                            </div>
                            <div class="col-md-auto">
                                <h5 class="text-center"> Usuario </h5>
                                <button type="button" class=" btn btn-light "> Seguido </button>
                            </div>
                            <div class="col text-right">
                                <a href="/docs/modificarFoto.html?photoId=${photo.photoId}"><img src="/docs/images/ajustes.png" class="botones"></a>
                            </div>
                        </div>
                        <h5 class="text-center"> ${photo.title} </h5>
                        <a href="/docs/foto.html?photoId=${photo.photoId}"><img src="${photo.url}" class="img-det rounded"></a>
                        <div>
                            <div class="row">
                                <div class="col-md-auto text-left">
                                    <p class="text-left"> 5★ Estrellas de media </p>
                                    <p class="text-left"> Tu valoración: </p>
                                    <form>
                                        <h2>
                                            <p class="clasificacion">
                                                <input id="radio1" type="radio" name="estrellas" value="5">
                                                <label for="radio1">★</label>
                                                <input id="radio2" type="radio" name="estrellas" value="4">
                                                <label for="radio2">★</label>
                                                <input id="radio3" type="radio" name="estrellas" value="3">
                                                <label for="radio3">★</label>
                                                <input id="radio4" type="radio" name="estrellas" value="2">
                                                <label for="radio4">★</label>
                                                <input id="radio5" type="radio" name="estrellas" value="1">
                                                <label for="radio5">★</label>
                                            </p>
                                        </h2>
                                    </form>
                                </div>
                                <div class="col-6 text-center">
                                    <p> ${photo.description} foto</p>
                                </div>
                                <div class="col-md">
                                    <a href="/docs/categoria.html">
                                        <p class="text-right"> ${photo.category} </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-none d-lg-block col-lg">
                        <div class="verticalLine" style="height: 700px; width: px;"></div>
                    </div>
                    <div class="d-none d-lg-block col-lg-auto text-center">
                        <div class="row">
                            <div class="col-3">
                                <a href="/docs/perfil.html"><img src="/docs/images/User.png" class="rounded-circle"
                                        width=50></a>
                            </div>
                            <div class="col-8 text-center">
                                <p>Comentario 1</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">
                                <a href="/docs/perfil.html"><img src="/docs/images/User.png" class="rounded-circle"
                                        width=50></a>
                            </div>
                            <div class="col-8 text-center">
                                <p>Comentario 1</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">
                                <a href="/docs/perfil.html"><img src="/docs/images/User.png" class="rounded-circle"
                                        width=50></a>
                            </div>
                            <div class="col-8 text-center">
                                <p>Comentario 1</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">
                                <a href="/docs/perfil.html"><img src="/docs/images/User.png" class="rounded-circle"
                                        width=50></a>
                            </div>
                            <div class="col-8 text-center">
                                <p>Comentario 1</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">
                                <a href="/docs/perfil.html"><img src="/docs/images/User.png" class="rounded-circle"
                                        width=50></a>
                            </div>
                            <div class="col-8 text-center">
                                <p>Comentario 1</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">
                                <a href="/docs/perfil.html"><img src="/docs/images/User.png" class="rounded-circle"
                                        width=50></a>
                            </div>
                            <div class="col-8 text-center">
                                <p>Comentario 1</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">
                                <a href="/docs/perfil.html"><img src="/docs/images/User.png" class="rounded-circle"
                                        width=50></a>
                            </div>
                            <div class="col-8 text-center">
                                <p>Comentario 1</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-3">
                                <a href="/docs/perfil.html"><img src="/docs/images/User.png" class="rounded-circle"
                                        width=50></a>
                            </div>
                            <div class="col-8 text-center">
                                <p>Comentario 1</p>
                            </div>
                        </div>
                        <hr>
                        <input type="text" class="form-control" id="comentario-input" name="comentario"
                            placeholder="Añadir Comentario">
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
    asCategoryDetails: function (photo) {
        let html = `<div class="row justify-content-center">
            <div class="col-7 text-center">
                    <div class="row">
                            <div class="col-md-auto">
                                    <a href="/docs/perfil.html"><img src="/docs/images/User.png"
                                                    class="photo-user"></a>
                            </div>
                            <div class="col-md-auto">
                                    <h5 class="text-center"> Usuario </h5>
                                    <button type="button" class=" btn btn-secondary "> Siguiendo </button>
                            </div>
                    </div>
                    <h5 class="text-center"> ${photo.title} </h5>
                    <a href="/docs/foto.html?photoId=${photo.photoId}"><img src="${photo.url}"
                                    class="card-img-top rounded"></a>
                    <div>
                            <div class="row">
                                    <div class="col-md-auto text-left">
                                            <p class="text-left"> Tu valoración: </p>
                                            <form>
                                                    <h2>
                                                            <p class="clasificacion">
                                                                    <input id="radio1" type="radio"
                                                                            name="estrellas" value="5">
                                                                    <label for="radio1">★</label>
                                                                    <input id="radio2" type="radio"
                                                                            name="estrellas" value="4">
                                                                    <label for="radio2">★</label>
                                                                    <input id="radio3" type="radio"
                                                                            name="estrellas" value="3">
                                                                    <label for="radio3">★</label>
                                                                    <input id="radio4" type="radio"
                                                                            name="estrellas" value="2">
                                                                    <label for="radio4">★</label>
                                                                    <input id="radio5" type="radio"
                                                                            name="estrellas" value="1">
                                                                    <label for="radio5">★</label>
                                                            </p>
                                                    </h2>
                                            </form>
                                            <p class="text-left"> 5★ Estrellas de media </p>
                                    </div>
                            </div>
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
                ${photo.title}
            </div>
        </div>
    </div>
    `;
        let categoria = parseHTML(html);
        return categoria;
    }
};

export { photoRenderer };