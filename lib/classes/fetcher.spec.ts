import {expect} from 'chai';
import {Fetcher} from "./fetcher";

describe('Fetcher', () => {
    it('Sould be a function', () => {
        expect(typeof Fetcher).to.equal('function');
    });
});