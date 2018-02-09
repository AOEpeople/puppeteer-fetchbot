import {Page} from "puppeteer";
import {SelectorAndPropertyInterface} from "../interfaces/selector-and-property";
import {hasDedicatedPropName} from "./helpers/has-dedicated-prop-name";

export class Crawler {
    constructor(private page: Page) {

    }



    public getSelectorAndPropertyName(key: string): SelectorAndPropertyInterface {
        const extractSelectorAndPropertyName: RegExp = new RegExp('(\\S+)\\sas\\s(\\S+)');

        let selectorAndProperty = {
            selector: key,
            property: key
        };

        if (hasDedicatedPropName(key)) {

            const extraction = key.match(extractSelectorAndPropertyName),
                SELECTOR = 1,
                PROPERTY = 2;

            if (!!extraction[SELECTOR] && !!extraction[PROPERTY]) {
                selectorAndProperty.selector = extraction[SELECTOR];
                selectorAndProperty.property = extraction[PROPERTY];
            }

        }

        return selectorAndProperty;
    }

    public async crawl(adapter: Object): Promise<Object> {

        return await this.page.evaluate((fetchItems) => {

            let data = {};
            const DOM = document.body;


            for (const originSelector of Object.keys(fetchItems)) {

                const mapping = this.getSelectorAndPropertyName(originSelector);

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