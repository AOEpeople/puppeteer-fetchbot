import {expect} from 'chai';
import {isCallWithArgs} from "./is-called-with-args";

describe('isCallWithArgs', function () {
    const isPageCommand = true;

    it('Should verify expected behavior for several param data types', () => {
        // Expected successful behavior
        expect(isCallWithArgs(isPageCommand, [])).to.eq(true);

        // Valid data but no page command
        expect(isCallWithArgs(!isPageCommand, [])).to.eq(false);

        // Expected unsuccessful behavior
        expect(isCallWithArgs(isPageCommand, null)).to.eq(false);
        expect(isCallWithArgs(isPageCommand, false)).to.eq(false);
        expect(isCallWithArgs(isPageCommand, true)).to.eq(false);
        expect(isCallWithArgs(isPageCommand, 1)).to.eq(false);
        expect(isCallWithArgs(isPageCommand, {})).to.eq(false);
    });
});