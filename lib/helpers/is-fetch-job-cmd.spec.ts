import {expect} from 'chai';
import {isFetchJobCmd} from "./is-fetch-job-cmd";
import {Bot} from "../classes/bot";

describe('isFetchJobCmd', function () {
    it('Sould be a function', () => {
        expect(typeof isFetchJobCmd).to.equal('function');
    });
});