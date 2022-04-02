"use strict";
exports.__esModule = true;
exports.PlayList = exports.Album = exports.Cancion = exports.Genero = exports.Artista = exports.Grupo = void 0;
var Grupo = /** @class */ (function () {
    function Grupo(nombre_, componentes_, /* o Artista*/ añoCreacion_, generos_, albumes_, oyentesMensuales_) {
        this.nombre_ = nombre_;
        this.componentes_ = componentes_;
        this.añoCreacion_ = añoCreacion_;
        this.generos_ = generos_;
        this.albumes_ = albumes_;
        this.oyentesMensuales_ = oyentesMensuales_;
    }
    return Grupo;
}());
exports.Grupo = Grupo;
var Artista = /** @class */ (function () {
    function Artista(nombre_, grupos_, generos_, albumes_, canciones_) {
        this.nombre_ = nombre_;
        this.grupos_ = grupos_;
        this.generos_ = generos_;
        this.albumes_ = albumes_;
        this.canciones_ = canciones_;
    }
    return Artista;
}());
exports.Artista = Artista;
var Genero = /** @class */ (function () {
    function Genero(nombre_, gruposOArtistas_, /* hay que hacer una interfaz generica para no usar union de tipos*/ albumes_, canciones_) {
        this.nombre_ = nombre_;
        this.gruposOArtistas_ = gruposOArtistas_;
        this.albumes_ = albumes_;
        this.canciones_ = canciones_;
    }
    return Genero;
}());
exports.Genero = Genero;
var Cancion = /** @class */ (function () {
    function Cancion(nombre_, autor_, /* o Artista*/ generos_, duracion_, single_, reproducciones_) {
        this.nombre_ = nombre_;
        this.autor_ = autor_;
        this.generos_ = generos_;
        this.duracion_ = duracion_;
        this.single_ = single_;
        this.reproducciones_ = reproducciones_;
    }
    return Cancion;
}());
exports.Cancion = Cancion;
var Album = /** @class */ (function () {
    function Album(nombre_, autor_, /* o Artista*/ añoPublicacion_, generos_, canciones_) {
        this.nombre_ = nombre_;
        this.autor_ = autor_;
        this.añoPublicacion_ = añoPublicacion_;
        this.generos_ = generos_;
        this.canciones_ = canciones_;
    }
    return Album;
}());
exports.Album = Album;
var PlayList = /** @class */ (function () {
    function PlayList(nombre_, autor_, /* o Artista*/ canciones_, generos_) {
        this.nombre_ = nombre_;
        this.autor_ = autor_;
        this.canciones_ = canciones_;
        this.generos_ = generos_;
    }
    return PlayList;
}());
exports.PlayList = PlayList;
