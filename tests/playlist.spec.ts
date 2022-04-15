import 'mocha';
import {expect} from 'chai';
import {PlayList, Gestor} from '../src/estructura/playlist';

const grp = new Gestor([]);

describe('Comprobar clase PlayList - Test', () => {
  describe('Comprobar clase JsonPlayListCollection', () => {
    it('Función addPlayList() añade una playlist', () => {
      grp.addPlayList(true, 0, "PlayList 1", "Sistema", ["Motomami", "Saoko"], "4:01", ["Pop", "Pop"]);
    });
    it('Función deletePlayList() elimina una playlist', () => {
      grp.deletePlayList('PlayList 1', "Usuario");
    });
    it('Existe función deletePlayListesVector()', () => {
      grp.deletePlayListVector(['PlayList 1']);
    });
    it('Existe Función getPlayList()', () => {
      expect(grp.getPlayList(0).getNombre()).to.eql('PlayList 1');
    });
    it('Existe función includesPlayList()', () => {
      expect(grp.includesPlayList("PlayList 1")).to.eql(true);
    });
    it('Existe Función getPlayListByName()', () => {
      expect(grp.getPlayListByName("Prueba")).to.eql(false);
    });
    it('Existe función ordAlfabeticoTitulo()', () => {
      expect(grp.ordAlfabeticoTitulo(true)).to.eql([]);
    });
    it('Existe función getPlayListByName()', () => {
      expect(grp.getPlayListByName('PlayList 1')).to.not.be.null;
    });
    it('Existe función updateAlfPlaylistCan()', () => {
      expect(grp.updateAlfPlaylistCan(true, 1)).to.not.be.null;
    });
    it('Existe función updateAlfPlaylistAut()', () => {
      expect(grp.updateAlfPlaylistAut(true, 1)).to.not.be.null;
    });
    it('Existe función updateAlfPlaylistGenero()', () => {
      expect(grp.updateAlfPlaylistGenero(true, 1)).to.not.be.null;
    });
    it('Existe función updatePlaylistAño()', () => {
      expect(grp.updatePlaylistAño(true, 1)).to.not.be.null;
    });
    it('Existe función updatePlaylistDur()', () => {
      expect(grp.updatePlaylistDur(true, 1)).to.not.be.null;
    });
    it('Existe función ordReproduccionesPlaylist()', () => {
      expect(grp.ordReproduccionesPlaylist(true, 1)).to.not.be.null;
    });
  });
  describe('Atributos de la clase PlayList', () => {
    it('Existe un Getter de tipo "Nombre"', () => {
      expect(grp.getPlayList(0).getNombre()).to.eql('PlayList 1');
    });
    it('Existe un Getter de tipo "Autor"', () => {
      expect(grp.getPlayList(0).getAutor()).to.eql('Sistema');
    });
    it('Existe un Getter de tipo "Canciones"', () => {
      expect(grp.getPlayList(0).getCanciones()).to.eql(["Motomami", "Saoko"]);
    });
    it('Existe un Getter de tipo "Duración"', () => {
      expect(grp.getPlayList(0).getDuracion()).to.eql("4:01");
    });
    it('Existe un Getter de tipo "Géneros"', () => {
      expect(grp.getPlayList(0).getGeneros()).to.eql(["Pop", "Pop"]);
    });
    it('Existe un Setter de tipo "Nombre"', () => {
      grp.getPlayList(0).setNombre("PlayList 1");
      expect(grp.getPlayList(0).getNombre()).to.eql("PlayList 1");
    });
    it('Existe un Setter de tipo "Componentes"', () => {
      grp.getPlayList(0).setAutor("Sistema");
      expect(grp.getPlayList(0).getAutor()).to.eql("Sistema");
    });
    it('Existe un Setter de tipo "Canciones"', () => {
      grp.getPlayList(0).setCanciones(["Motomami", "Saoko"]);
      expect(grp.getPlayList(0).getCanciones()).to.eql(["Motomami", "Saoko"]);
    });
    it('Existe un Setter de tipo "Duración"', () => {
      grp.getPlayList(0).setDuracion("4:01");
      expect(grp.getPlayList(0).getDuracion()).to.eql("4:01");
    });
    it('Existe un Setter de tipo "Géneros"', () => {
      grp.getPlayList(0).setGeneros(["Pop", "Pop"]);
      expect(grp.getPlayList(0).getGeneros()).to.eql(["Pop", "Pop"]);
    });
  });
});