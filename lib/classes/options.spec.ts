import {expect} from 'chai';
import {Options} from "./options";


describe('Options',  () =>{
    it('Should be a function', () => {
        expect(typeof Options).to.equal('function');
    });
});