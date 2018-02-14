import {expect} from 'chai';
import {isSelectorStringCmd} from "./is-selector-string-cmd";
import {Bot} from "../classes/bot";

describe('isSelectorStringCmd', function () {
    const isPageCommand = true;

    it('Should verify expected behavior for several param data types', () => {
        // Expected successful behavior
        expect(isSelectorStringCmd(isPageCommand, '')).to.eq(true);

        // Valid data but no page command
        expect(isSelectorStringCmd(!isPageCommand, '')).to.eq(false);

        // Expected unsuccessful behavior
        expect(isSelectorStringCmd(isPageCommand, null)).to.eq(false);
        expect(isSelectorStringCmd(isPageCommand, false)).to.eq(false);
        expect(isSelectorStringCmd(isPageCommand, true)).to.eq(false);
        expect(isSelectorStringCmd(isPageCommand, 1)).to.eq(false);
        expect(isSelectorStringCmd(isPageCommand, [])).to.eq(false);
        expect(isSelectorStringCmd(isPageCommand, {})).to.eq(false);
    });
});