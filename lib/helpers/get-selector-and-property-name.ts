import {hasDedicatedPropName} from "./has-dedicated-prop-name";
import {SelectorAndPropertyInterface} from "../../interfaces/selector-and-property";

export function getSelectorAndPropertyName(key: string): SelectorAndPropertyInterface {
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