import {Page} from "puppeteer";
import {getSelectorAndPropertyName} from "../helpers/get-selector-and-property-name";
import {hasDedicatedPropName} from "../helpers/has-dedicated-prop-name";
import {SelectorAndPropertyInterface} from "../interfaces/selector-and-property";

export class Fetcher {

    constructor(private page: Page) {

    }

    public async pull(adapter: Object): Promise<Object> {
        // TODO evaluate if it's somehomw/practical possible to deduplicate getSelectorAndPropertyName and  hasDedicatedPropName functions
        //await page.exposeFunction("add", (a, b) => a + b);
        //await this.page.addScriptTag({content: '${getSelectorAndPropertyName} ${hasDedicatedPropName}});

        return await this.page.evaluate((fetchItems) => {

            // TODO IMPORTANT
            // TODO Determine how to use the helper functions here (Stackoverflow)!?!
            const getSelectorAndPropertyName = (key: string): SelectorAndPropertyInterface => {


                const regExpString: string = '([[.#a-z][a-zA-Z0-9\\s()>\\.:"\'\\-=\\]]+|[a-z])\\sas\\s([a-z][a-zA-Z0-9]+|[a-z])';

                // Apply RegExpString
                const extractSelectorAndPropertyName: RegExp = new RegExp(regExpString, 'i');

                let selectorAndProperty = {
                    selector: key,
                    property: key
                };


                if (hasDedicatedPropName(key)) {

                    const extraction = key.match(extractSelectorAndPropertyName),
                        SELECTOR = 1,
                        PROPERTY = 2;

                    if (!!extraction && !!extraction[SELECTOR] && !!extraction[PROPERTY]) {
                        selectorAndProperty.selector = extraction[SELECTOR];
                        selectorAndProperty.property = extraction[PROPERTY];
                    } else {
                        throw new Error('SELECTOR_AS_PROPERTY_CUT_FAILED');
                    }

                }

                return selectorAndProperty;
            };
            const hasDedicatedPropName = (key): boolean => {
                const hasDedicatedPropName: RegExp = new RegExp('\\S\\sas\\s\\S', 'i');
                return key.match(hasDedicatedPropName) !== null;
            };


            let data = {};
            const DOM = document.body;


            for (const originSelector of Object.keys(fetchItems)) {

                const mapping = getSelectorAndPropertyName(originSelector);

                data[mapping.property] = fetchItems[originSelector];

                if (data[mapping.property] instanceof Array) {
                    const nodeList: any /*NodeList*/ = DOM.querySelectorAll(mapping.selector);
                    nodeList.forEach((node: any /*ChildNode*/) => {
                        data[mapping.property].push(node.textContent.trim());
                    });
                } else if (typeof data[mapping.property] === 'string') {
                    const node: any /*ChildNode*/ = DOM.querySelector(mapping.selector);
                    data[mapping.property] = node.textContent.trim();
                } else if (typeof data[mapping.property] === 'number') {
                    const node: any /*ChildNode*/ = DOM.querySelector(mapping.selector);
                    data[mapping.property] = parseInt(node.textContent, 10);
                } else if (data[mapping.property] === null) {
                    const nodeList: any /*NodeList*/ = DOM.querySelectorAll(mapping.selector);
                    data[mapping.property] = [];
                    nodeList.forEach((node: any /*ChildNode*/) => {
                        data[mapping.property].push(parseInt(node.textContent, 10));
                    });
                } else if (data[mapping.property] === false) {
                    const node: any /*ChildNode */ = DOM.querySelector(mapping.selector);

                    data[mapping.property] = (node !== null);
                }
            }

            return data;

        }, adapter);
    }
}