import {hasDedicatedPropName} from "./has-dedicated-prop-name";
import {SelectorAndPropertyInterface} from "../interfaces/selector-and-property";

export function getSelectorAndPropertyName(key: string): SelectorAndPropertyInterface {

    // NOTICE
    // Please uncomment old RegExp's instead of delete them
    // to keep changes here more transparent than in git history
//
//  const regExpString: string = (\\S+)\\sas\\s(\\S+);
//  const regExpString: string = '^([a-z-A-Z0-9]|\\s{1}|[\\(\\)>:<\\.]+)*\\s{1}as\\s{1}([a-z-A-Z0-9]*)';
//  const regExpString: string = '^([a-z-A-Z0-9]|\s{1}|[\(\)>:<\.])*\s{1}as\s{1}([a-zA-Z]{1}[a-zA-Z0-9]+)';
//  const regExpString: string = '([a-z][a-zA-Z0-9\\s()>.:-]+)\\sas\\s([a-z][a-zA-Z0-9]+)';
//  const regExpString: string = '([a-z][a-zA-Z0-9\\s()>.:-]+)\\sas\\s(([a-z][a-zA-Z0-9]+|[a-z]+))';
//  const regExpString: string = '([.#a-z][a-zA-Z0-9\\s()>.:-]+|[a-z])\\sas\\s([a-z][a-zA-Z0-9]+|[a-z])';
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
}