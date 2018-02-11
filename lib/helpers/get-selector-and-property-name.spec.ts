import {expect} from 'chai';
import {getSelectorAndPropertyName} from "./get-selector-and-property-name";

describe('getSelectorAndPropertyName',  ()=> {
    it('should be a function', () => {
        expect(typeof getSelectorAndPropertyName).to.equal('function');
    });
});