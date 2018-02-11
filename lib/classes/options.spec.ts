import {expect} from 'chai';
import {Options} from "./options";
import {Bot} from "./bot";

describe('Options',  () =>{
    it('Sould be a function', () => {
        expect(typeof Options).to.equal('function');
    });
});