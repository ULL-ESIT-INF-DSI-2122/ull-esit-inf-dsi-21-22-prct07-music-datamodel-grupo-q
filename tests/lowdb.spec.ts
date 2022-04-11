import 'mocha';
import {expect} from 'chai';
import {JsonCancionCollection} from '../src/estructura/cancion';

let col = new JsonCancionCollection([]);
describe('prueba lowdb', () => {
    it('prueba', () => {
        col.addCancion('Buleria', 'Bisbal', ["Pop"], '2:10', true, 50000);
        // col.deleteCancion('Buleria');
        expect(col.getCancion(0).getNombre()).to.eql('Alone');
    });
  });
