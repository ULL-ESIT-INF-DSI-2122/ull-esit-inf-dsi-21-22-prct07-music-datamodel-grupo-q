import 'mocha';
import {expect} from 'chai';
import {add} from '../src/prueba';
import {resta} from '../src/prueba';
import {multiplicacion} from '../src/prueba';
import {division} from '../src/prueba';


describe('operaciones complejas', () => {
  it('suma entre dos numeros', () => {
    expect(add(1, 8)).to.eql(9);
  });
  it('resta entre dos numeros', () => {
    expect(resta(1, 7)).to.eql(-6);
  });
  it('multiplicacion entre dos numeros', () => {
    expect(multiplicacion(1, 7)).to.eql(7);
  });
  it('division entre dos numeros', () => {
    expect(division(1, 7)).to.eql(0.14285714285714285);
  });
});
