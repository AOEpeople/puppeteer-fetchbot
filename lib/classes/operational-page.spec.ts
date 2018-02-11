import {expect} from 'chai';
import {OperationalPage} from "./operational-page";
import {Bot} from "./bot";

describe('OperationalPage', () => {
    it('Sould be a function', () => {
        expect(typeof OperationalPage).to.equal('function');
    });
});