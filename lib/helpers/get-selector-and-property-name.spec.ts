import {expect} from 'chai';
import {getSelectorAndPropertyName} from "./get-selector-and-property-name";
import {SelectorAndPropertyInterface} from "../../interfaces/selector-and-property";

describe('getSelectorAndPropertyName', () => {

    const validSamples: SelectorAndPropertyInterface[] = [
        {selector: 'a', property: 'b'},
        {
            selector: 'body > div.wrapper > pre > table > tbody > tr > td.text > pre > span:nth-child(123)',
            property: 'bsdf'
        },
        {
            selector: 'a.no-wrap.text-gray.d-inline-block.muted-link',
            property: 'sharedKnowledgeLanguages'
        },
        {
            selector: '.member-info',
            property: 'mitarbeiter'
        },
        {
            selector:"[title=\"Repositories\"]",
            property:'numberExample'
        }
    ];


    validSamples
        .forEach((sample: SelectorAndPropertyInterface) => {

            it('Should pass ' + sample.selector + ' as ' + sample.property, () => {

                let generatedQueryStringToPropertyName = sample.selector + ' as ' + sample.property,
                    reSample = getSelectorAndPropertyName(generatedQueryStringToPropertyName);

                expect(reSample.selector).to.equal(sample.selector);
                expect(reSample.property).to.equal(sample.property);
            });

            it('Should pass ' + sample.selector + ' AS ' + sample.property, () => {

                let generatedQueryStringToPropertyName = sample.selector + ' AS ' + sample.property,
                    reSample = getSelectorAndPropertyName(generatedQueryStringToPropertyName);

                expect(reSample.selector).to.equal(sample.selector);
                expect(reSample.property).to.equal(sample.property);
            });
        });

    it('Should use input string for selector and propertyName', () => {
        let example = 'some > selector .with > .class';
        let inputEqualsOutputExample = getSelectorAndPropertyName(example);

        expect(inputEqualsOutputExample.selector).to.equal(example);
        expect(inputEqualsOutputExample.property).to.equal(example);
    });

    it('Should throw error: SELECTOR_AS_PROPERTY_CUT_FAILED (which means to update the RegExp in real a world scenario)', () => {
        let example = '<asad as <adfadsf';
        try {
            getSelectorAndPropertyName(example);
        } catch (error) {
            expect(error.message).to.be.equal('SELECTOR_AS_PROPERTY_CUT_FAILED');
        }
    });
});