"use strict";
exports.__esModule = true;
exports.Artista = void 0;
var Artista = /** @class */ (function () {
    function Artista(nombre_, grupos_, generos_, albumes_, canciones_) {
        var _this = this;
        this.nombre_ = nombre_;
        this.grupos_ = grupos_;
        this.generos_ = generos_;
        this.albumes_ = albumes_;
        this.canciones_ = canciones_;
        var oyentesInd = 0;
        var oyentesGrup = 0;
        this.canciones_.forEach(function (cancion) {
            _this.grupos_.forEach(function (grupo) {
                if (cancion.getAutor() == grupo.getNombre()) {
                    oyentesInd = oyentesInd + cancion.getReproducciones();
                }
            });
        });
    }
    Artista.prototype.getNombre = function () {
        return this.nombre_;
    };
    Artista.prototype.getGrupos = function () {
        return this.grupos_;
    };
    Artista.prototype.getGeneros = function () {
        return this.generos_;
    };
    Artista.prototype.getAlbumes = function () {
        return this.albumes_;
    };
    Artista.prototype.getCanciones = function () {
        return this.canciones_;
    };
    Artista.prototype.getOyentes = function () {
        return this.oyentesMensuales_;
    };
    Artista.prototype.setNombre = function (nombre) {
        this.nombre_ = nombre;
    };
    Artista.prototype.setGrupos = function (grupos) {
        this.grupos_ = grupos;
    };
    Artista.prototype.setGeneros = function (generos) {
        this.generos_ = generos;
    };
    Artista.prototype.setAlbumes = function (albumes) {
        this.albumes_ = albumes;
    };
    Artista.prototype.setCanciones = function (canciones) {
        this.canciones_ = canciones;
    };
    Artista.prototype.setOyentes = function (oyentes) {
        this.oyentesMensuales_ = oyentes;
    };
    return Artista;
}());
exports.Artista = Artista;
