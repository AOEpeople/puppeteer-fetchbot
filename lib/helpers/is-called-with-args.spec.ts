import {expect} from 'chai';
import {isCallWithArgs} from "./is-called-with-args";
import {Bot} from "../classes/bot";

describe('isCallWithArgs', function () {
    it('Sould be a function', () => {
        expect(typeof isCallWithArgs).to.equal('function');
    });
});