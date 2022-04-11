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
    it('Existe función deleteCancionesVector()', () => {
      // console.log(col.deleteCancionesVector([]));
    });
    it('Existe Función getCancion()', () => {
      expect(col.getCancion(0).getNombre()).to.eql('Alone');
    });
    it('Existe función includesCancion()', () => {
      expect(col.includesCancion("Alone")).to.eql(true);
    });
    it('Función getCancionByName() = Undefined', () => {
      expect(col.getCancionByName("Enemy")).to.eql(undefined);
    });
    // it('Existe getCancionByName()', () => {
    //   expect(col.getCancionByName("Enemy").getNombre()).to.eql('Enemy');
    // });
    it('Existe función ordSingles()', () => {
      // expect(col.ordSingles()).to.eql(undefined);
      // console.log(col.ordSingles());
    });
    it('Existe función ordRepros()', () => {
      expect(col.ordRepros).to.exist;
    });
    it('Existe función ordAlfabeticoTitulo()', () => {
      expect(col.ordAlfabeticoTitulo).to.exist;
    });
    it('Existe función displayCanciones()', () => {
      expect(col.displayCanciones).to.exist;
    });
    it('Existe función displayMode()', () => {
      expect(col.displayMode).to.exist;
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
      expect(col.getCancion(0).printData).to.exist;
    });
    it('Existe función convertJSON()', () => {
      expect(col.getCancion(0).convertJSON).to.exist;
    });
  });
});