import {expect} from 'chai';
import {isCallNoArgs} from "./is-called-no-args";

describe('isCallNoArgs', function () {

    const isPageCommand = true;

    it('Should verify expected behavior for several param data types', () => {
        // Expected successful behavior
        expect(isCallNoArgs(isPageCommand, null)).to.eq(true);

        // Valid data but no page command
        expect(isCallNoArgs(!isPageCommand, null)).to.eq(false);

        // Expected unsuccessful behavior
        expect(isCallNoArgs(isPageCommand, false)).to.eq(false);
        expect(isCallNoArgs(isPageCommand, true)).to.eq(false);
        expect(isCallNoArgs(isPageCommand, 1)).to.eq(false);
        expect(isCallNoArgs(isPageCommand, [])).to.eq(false);
        expect(isCallNoArgs(isPageCommand, {})).to.eq(false);
    });
});