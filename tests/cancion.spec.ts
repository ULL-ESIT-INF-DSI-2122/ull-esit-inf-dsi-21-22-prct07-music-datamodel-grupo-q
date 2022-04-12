import 'mocha';
import { expect } from 'chai';
import { Cancion, JsonCancionCollection } from '../src/estructura/cancion';

let col = new JsonCancionCollection([]);

describe('Comprobar clase Cancion - Test', () => {
  describe('Comprobar clase JsonCancionCollection', () => {
    it('Función addCancion() añade una canción', () => {
      col.addCancion('Buleria', 'Bisbal', ["Pop"], '2:10', true, 50000);
    });
    it('Función deleteCancion() elimina una canción', () => {
      col.deleteCancion('Buleria');
    });
    // mal
    it('Existe función deleteCancionesVector()', () => {
      col.deleteCancionesVector(['Buleria']);
    });
    it('Existe Función getCancion()', () => {
      expect(col.getCancion(0).getNombre()).to.eql('Alone');
    });
    it('Existe función includesCancion()', () => {
      expect(col.includesCancion("Alone")).to.eql(true);
    });
    it('Existe Función getCancionByName()', () => {
      expect(col.getCancionByName("Prueba")).to.eql(undefined);
    });
    it('Existe función ordSingles()', () => {
      expect(col.ordSingles()).to.eql([]);
    });
    it('Existe función ordReproducciones()', () => {
      expect(col.ordReproducciones(true)).to.eql([]);
    });
    it('Existe función ordAlfabeticoTitulo()', () => {
      expect(col.ordAlfabeticoTitulo(true)).to.eql([]);
    });
    it('Existe función displayCanciones()', () => {
      expect(col.displayCanciones()).to.not.be.null;
    });
    it('Existe función displayMode()', () => {
      expect(col.displayMode()).to.not.be.null;
    });
  });
  describe('Atributos de la clase Cancion', () => {
    it('Existe un Getter de tipo "Nombre"', () => {
      expect(col.getCancion(0).getNombre()).to.eql('Alone');
    });
    it('Existe un Getter de tipo "Autor"', () => {
      expect(col.getCancion(0).getAutor()).to.eql('Alan Walker');
    });
    it('Existe un Getter de tipo "Géneros"', () => {
      expect(col.getCancion(0).getGeneros()).to.eql(['Pop', 'Electronica']);
    });
    it('Existe un Getter de tipo "Duracion"', () => {
      expect(col.getCancion(0).getDuracion()).to.eql('2:45');
    });
    it('Existe un Getter de tipo "Single"', () => {
      expect(col.getCancion(0).getSingle()).to.eql(true);
    });
    it('Existe un Getter de tipo "Reproducciones"', () => {
      expect(col.getCancion(0).getReproducciones()).to.be.deep.equal(1200000000);
    });
    it('Existe un Setter de tipo "Nombre', () => {
      col.getCancion(0).setNombre("Alone");
      expect(col.getCancion(0).getNombre()).to.eql("Alone");
    });
    it('Existe un Setter de tipo "Autor', () => {
      col.getCancion(0).setAutor('Alan Walker');
      expect(col.getCancion(0).getAutor()).to.eql('Alan Walker');
    });
    it('Existe un Setter de tipo "Géneros', () => {
      col.getCancion(0).setGeneros(['Pop', 'Electronica']);
      expect(col.getCancion(0).getGeneros()).to.eql(['Pop', 'Electronica']);
    });
    it('Existe un Setter de tipo "Duracion', () => {
      col.getCancion(0).setDuracion('2:45');
      expect(col.getCancion(0).getDuracion()).to.eql('2:45');
    });
    it('Existe un Setter de tipo "Single', () => {
      col.getCancion(0).setSingle(true);
      expect(col.getCancion(0).getSingle()).to.eql(true);
    });
    it('Existe un Setter de tipo "Reproducciones', () => {
      col.getCancion(0).setReproducciones(1200000000);
      expect(col.getCancion(0).getReproducciones()).to.eql(1200000000);
    });
    it('Existe función printdata()', () => {
      expect(col.getCancion(0).printData()).to.not.be.null;
    });
    it('Existe función convertJSON()', () => {
      expect(col.getCancion(0).convertJSON()).to.not.be.null;
    });
  });
});
