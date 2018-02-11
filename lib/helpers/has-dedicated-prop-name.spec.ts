import {expect} from 'chai';
import {hasDedicatedPropName} from "./has-dedicated-prop-name";
import {Bot} from "../classes/bot";

describe('hasDedicatedPropName', () => {
    it('Sould be a function', () => {
        expect(typeof hasDedicatedPropName).to.equal('function');
    });
});