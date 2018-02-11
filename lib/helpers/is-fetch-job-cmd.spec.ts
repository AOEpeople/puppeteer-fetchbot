import {expect} from 'chai';
import {isFetchJobCmd} from "./is-fetch-job-cmd";

describe('isFetchJobCmd', function () {

    const isNotAPageCommand = false;

    it('Should verify expected behavior for several param data types', () => {
        // Expected successful behavior
        expect(isFetchJobCmd(isNotAPageCommand, {}, 'fetch')).to.eq(true);


        // Valid data BUT page command
        expect(isFetchJobCmd(!isNotAPageCommand, {}, 'fetch')).to.eq(false);
        expect(isFetchJobCmd(!isNotAPageCommand, {}, 'abc')).to.eq(false);


        // Expected unsuccessful behavior due to invalid datatypes for expected params
        expect(isFetchJobCmd(isNotAPageCommand, [], 'fetch')).to.eq(false);
        expect(isFetchJobCmd(isNotAPageCommand, 1, 'fetch')).to.eq(false);
        expect(isFetchJobCmd(isNotAPageCommand, null, 'fetch')).to.eq(false);
        expect(isFetchJobCmd(isNotAPageCommand, false, 'fetch')).to.eq(false);
        expect(isFetchJobCmd(isNotAPageCommand, '', 'fetch')).to.eq(false);

    });
});