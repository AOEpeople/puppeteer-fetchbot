import {expect} from 'chai';
import {isFetchJobCmd} from "./is-fetch-job-cmd";

describe('isFetchJobCmd', function () {
    it('Should be a function', () => {
        expect(typeof isFetchJobCmd).to.equal('function');
    });
});