import * as puppeteer from "puppeteer";
import {Browser} from "puppeteer";
import {Options} from "./options";
import {OptionsInterface} from "../../interfaces/options";

/**
 * Singleton class (one shared instance)
 */
export class ProvisionedBrowser {

    private _browserInstance: Browser;

    constructor(protected options: Options) {

    }

    public async getBrowserInstance(): Promise<Browser> {

        //if (typeof this._browserInstance === 'undefined') {
            this._browserInstance = await puppeteer.launch({
                headless: this.options.getRunMode(),
                ignoreHTTPSErrors: this.options.ignoreHttpErrors(),
                //   slowMo: 250,
                args: [`--window-size=${this.options.getDimensions().width},${this.options.getDimensions().height}`]
            });
        //}

        return this._browserInstance;
    }
}