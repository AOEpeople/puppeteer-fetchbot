import {expect} from 'chai';
import {isAllowedCmd} from "./is-allowed-cmd";

describe('isAllowedCmd', () => {

    it('Should verify expected behavior for several param data types', () => {
        // Expected successful behavior
        expect(isAllowedCmd('click')).to.eq(true);
        expect(isAllowedCmd('type')).to.eq(true);

        // Expected unsucsessful behavior
        expect(isAllowedCmd('')).to.eq(false);
        expect(isAllowedCmd('root')).to.eq(false);
        expect(isAllowedCmd('maxCalls')).to.eq(false);
    });
});