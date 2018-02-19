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

            let domAttrName: string,
                isDataSet: boolean = false,
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
                domAttrName = 'textContent';

                if (data[mapping.property] !== null && typeof data[mapping.property] === 'object' && !!data[mapping.property].attr) {

                    isDataSet = data[mapping.property].attr.match(/^data-/) !== null;

                    domAttrName = data[mapping.property].attr || domAttrName;

                    domAttrName = (isDataSet) ? domAttrName.replace(/^data-/, '') : domAttrName;
                    domAttrName = (domAttrName === 'class') ? 'className' : domAttrName;


                    data[mapping.property] = (data[mapping.property].type !== false) ? data[mapping.property].type : false;
                }
                // TODO create a new function to grab the requested data and less complex

                if (DOM.querySelector(mapping.selector) !== null) {

                    if (data[mapping.property] instanceof Array) {
                        const nodeList: any /*NodeList*/ = DOM.querySelectorAll(mapping.selector);
                        nodeList.forEach((node: any /*ChildNode*/) => {
                            if (!isDataSet) {
                                data[mapping.property].push((extract(node, [domAttrName]) + '').trim());
                            } else {
                                data[mapping.property].push((extract(node, ['dataset', domAttrName]) + '').trim());
                            }
                        });
                    } else if (typeof data[mapping.property] === 'string') {
                        const node: any /*ChildNode*/ = DOM.querySelector(mapping.selector);
                        if (!isDataSet) {
                            data[mapping.property] = (extract(node, [domAttrName]) + '').trim();
                        } else {
                            data[mapping.property] = (extract(node, ['dataset', domAttrName]) + '').trim();
                        }
                    } else if (typeof data[mapping.property] === 'number') {
                        const node: any /*ChildNode*/ = DOM.querySelector(mapping.selector);
                        if (!isDataSet) {
                            data[mapping.property] = parseInt(extract(node, [domAttrName]), 10);
                        } else {
                            data[mapping.property] = parseInt(extract(node, ['dataset', domAttrName]), 10);
                        }
                    } else if (data[mapping.property] === null) {
                        const nodeList: any /*NodeList*/ = DOM.querySelectorAll(mapping.selector);
                        data[mapping.property] = [];
                        nodeList.forEach((node: any /*ChildNode*/) => {
                            if (!isDataSet) {
                                data[mapping.property].push(parseInt(extract(node, [domAttrName]), 10));
                            } else {
                                data[mapping.property].push(parseInt(extract(node, ['dataset', domAttrName]), 10));
                            }
                        });
                    } else if (data[mapping.property] === false) {
                        const node: any /*ChildNode */ = DOM.querySelector(mapping.selector);

                        if (!isDataSet) {
                            data[mapping.property] = !!extract(node, [domAttrName]);
                        } else {
                            data[mapping.property] = !!extract(node, ['dataset', domAttrName]);
                        }
                    }
                }
            }

            return data;

        }, adapter);
    }
}