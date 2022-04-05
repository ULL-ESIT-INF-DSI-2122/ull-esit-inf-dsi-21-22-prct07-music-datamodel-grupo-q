// import 'mocha';
// import {expect} from 'chai';
// import {Grupo} from '../src/estructura/grupo';
// import {Album} from '../src/estructura/album';
// import {Artista} from '../src/estructura/artista';
// import {Cancion} from '../src/estructura/cancion';
// import {Genero} from '../src/estructura/genero';
// import {PlayList} from '../src/estructura/playlist';

// /**
//  * Grupo = Galácticas
//  * Artista = Rosalia
//  * Genero = Musical
//  * Cancion = Saoko
//  * Album = Motomami
//  * PlayList = Spotify
//  */
// let saoko: Cancion = new Cancion("Saoko", "Rosalia", [{genero: musical}], "3 minutos", true, 10000);

// let motomami: Album = new Album("Motomami", "Rosalia", 2022, [{genero: musical}], [{cancion: saoko}]);

// let rosalia: Artista = new Artista("Rosalia", [{grupo: galacticas}], [{genero: musical}], [{album: motomami}], [{cancion: saoko}]);
// let galacticas: Grupo = new Grupo("Galacticas", [{artista: rosalia}], 2004, [{genero: musical}], [{album: motomami}], 20000);

// // let musical: Genero = new Genero("Rosalia", [{grupo: galacticas}], [{artista: rosalia}], [{album: motomami}], [{cancion: saoko}]);


// let spotify: PlayList = new PlayList("Spotify", [{cancion: saoko}], "4 minutos", [{genero: musical}]);


// describe('Descripción de la biblioteca Musical', () => {

//   describe('Generos Musicales Test', () => {
//     let musical: Genero = new Genero("Rosalia", [{grupo: galacticas}], [{artista: rosalia}], [{album: motomami}], [{cancion: saoko}]);

//     it('Creación de objeto genero', () => {
//       expect(new Genero("Rosalia", [{grupo: galacticas}], [{artista: rosalia}], [{album: motomami}], [{cancion: saoko}])).not.to.be.equal(null);
//     });
//     it('Comprobación de getNombre()', () => {
//       expect(musical.getNombre()).to.be.equal("Rosalia");
//     });
//     it('Comprobación de getGrupos() ', () => {
//       expect(musical.getGrupos).to.be.equal([{grupo: galacticas}]);
//     });
//     it('Comprobación de getArtistas() ', () => {
//       expect(musical.getArtistas()).to.be.equal([{artista: rosalia}]);
//     });
//     it('Comprobación de getAlbumes() ', () => {
//       expect(musical.getAlbumes()).to.be.equal([{album: motomami}]);
//     });
//     it('Comprobación de getCanciones() ', () => {
//       expect(musical.getCanciones()).to.be.equal( [{cancion: saoko}]);
//     });
//   });
// });
