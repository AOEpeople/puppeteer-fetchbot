import {expect} from 'chai';
import {hasDedicatedPropName} from "./has-dedicated-prop-name";
import {Bot} from "../classes/bot";

describe('hasDedicatedPropName', () => {

    it('Should verify expected behavior for several string variants', () => {
        // Expected successful behavior
        expect(hasDedicatedPropName('some selector as someProperty')).to.eq(true);
        expect(hasDedicatedPropName('some selector AS someProperty')).to.eq(true);

        // Expected unsuccessful behavior
        expect(hasDedicatedPropName('some selectorAS someProperty')).to.eq(false);
        expect(hasDedicatedPropName('some selectorASsomeProperty')).to.eq(false);
        expect(hasDedicatedPropName('some selectorassomeProperty')).to.eq(false);

        expect(hasDedicatedPropName('some selector as ')).to.eq(false);


    });
});