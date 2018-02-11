import {expect} from 'chai';
import {Bot} from "./bot";

describe('Bot', () => {

    it('Sould be a function', () => {
        expect(typeof Bot).to.equal('function');
    });
});