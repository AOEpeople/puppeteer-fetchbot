import {expect} from 'chai';
import {isAllowedCmd} from "./is-allowed-cmd";
import {Bot} from "../classes/bot";

describe('isAllowedCmd', () => {
    it('Should be a function', () => {
        expect(typeof isAllowedCmd).to.equal('function');
    });
});