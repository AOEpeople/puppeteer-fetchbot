import {expect} from 'chai';
import {isCallWithArgs} from "./is-called-with-args";
import {Bot} from "../classes/bot";

describe('isCallWithArgs', function () {
    it('Should be a function', () => {
        expect(typeof isCallWithArgs).to.equal('function');
    });
});