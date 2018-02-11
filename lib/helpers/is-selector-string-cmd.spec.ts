import {expect} from 'chai';
import {isSelectorStringCmd} from "./is-selector-string-cmd";
import {Bot} from "../classes/bot";

describe('isSelectorStringCmd', function () {
    it('Sould be a function', () => {
        expect(typeof isSelectorStringCmd).to.equal('function');
    });
});