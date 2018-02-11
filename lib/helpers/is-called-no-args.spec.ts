import {expect} from 'chai';
import {isCallNoArgs} from "./is-called-no-args";
import {Bot} from "../classes/bot";

describe('isCallNoArgs', function () {
    it('Should be a function', () => {
        expect(typeof isCallNoArgs).to.equal('function');
    });
});