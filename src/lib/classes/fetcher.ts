import {Page} from "puppeteer";

import {SelectorAndPropertyInterface} from "../interfaces/selector-and-property";

export class Fetcher {

    constructor(private page: Page) {

    }

    public async pull(adapter: Object): Promise<Object> {
        // TODO evaluate if it's somehomw/practical possible to deduplicate getSelectorAndPropertyName and  hasDedicatedPropName functions
        //await page.exposeFunction("add", (a, b) => a + b);
        //await this.page.addScriptTag({content: '${getSelectorAndPropertyName} ${hasDedicatedPropName}});

        return await this.page.evaluate((fetchItems) => {

            // TODO Determine how to use the helper functions here (Stackoverflow)!?!
            const getSelectorAndPropertyName = (key: string): SelectorAndPropertyInterface => {

                const regExpString: string = '([\\[.#a-z][\\[#a-zA-Z0-9\\s()>\\.:_"\'\\-=\\]]+|[a-z])\\sas\\s([a-z][a-zA-Z0-9]+|[a-z])';

                // Apply RegExpString
                const extractSelectorAndPropertyName: RegExp = new RegExp(regExpString, 'i');

                let selectorAndProperty = {
                    selector: key,
                    property: key
                };

                const hasDedicatedPropName = (key): boolean => {
                    const hasDedicatedPropName: RegExp = new RegExp('\\S\\sas\\s\\S', 'i');
                    return key.match(hasDedicatedPropName) !== null;
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

            const DOM = document.body;

            let isDataSet: boolean = false,
                data = {};

            for (const originSelector of Object.keys(fetchItems)) {

                const mapping = getSelectorAndPropertyName(originSelector);
                const extract = (rootDom, pathToData: string[] = []) => {
                    let propCapture = rootDom;

                    pathToData.forEach((pathNamePartial: string) => {
                        propCapture = propCapture[pathNamePartial];
                    });

                    return propCapture;
                };

                data[mapping.property] = fetchItems[originSelector];

                let target = [];

                // Ensure prop name consistency (unstable)
                // TODO stabilize
                if (data[mapping.property] !== null && typeof data[mapping.property] === 'object' && !!data[mapping.property].attr) {

                    isDataSet = data[mapping.property].attr.match(/^data-/) !== null;

                    if (isDataSet) {
                        target.push('dataset');
                    }

                    target.push(data[mapping.property].attr.replace(/^data-/, ''));

                    let last = target.pop();
                    target.push((last === 'class') ? 'className' : last);

                    data[mapping.property] = (data[mapping.property].type !== false) ? data[mapping.property].type : false;
                } else {
                    target.push('textContent')
                }

                // TODO create a new function to grab the requested data and less complex
                let SINGLE_DOM_ELEMENT_REFERENCE = DOM.querySelector(mapping.selector);

                if (SINGLE_DOM_ELEMENT_REFERENCE !== null) {
                    const IS_NUMBER_ITERABLE = data[mapping.property] === null;
                    const IS_STRING_ITERABLE = data[mapping.property] instanceof Array;
                    const IS_NUMBER = typeof data[mapping.property] === 'number';
                    const IS_BOOLEAN = data[mapping.property] === false;
                    const IS_ITERABLE = (IS_NUMBER_ITERABLE || IS_STRING_ITERABLE);
                    const SOURCE: any = (IS_ITERABLE) ? DOM.querySelectorAll(mapping.selector) : SINGLE_DOM_ELEMENT_REFERENCE;

                    if (IS_ITERABLE) {
                        data[mapping.property] = [];
                        let requestedDomProperty = target.pop();
                        SOURCE.forEach((node: any /*ChildNode*/) => {
                            target = [];
                            if (isDataSet) {
                                target.push('dataset');
                            }
                            target.push(requestedDomProperty);
                            data[mapping.property].push((extract(node, target) + '').trim());
                            if (IS_NUMBER_ITERABLE) {
                                let last = data[mapping.property].pop();
                                data[mapping.property].push(parseInt(last, 10));
                            }
                        });
                    } else if (IS_BOOLEAN) {
                        data[mapping.property] = !!extract(SOURCE, target);
                    } else {
                        // STRING or NUMBER
                        data[mapping.property] = (extract(SOURCE, target) + '').trim();

                        if (IS_NUMBER) {
                            data[mapping.property] = parseInt(data[mapping.property], 10);
                        }
                    }
                }
            }

            return data;

        }, adapter);
    }
}