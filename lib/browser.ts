import * as puppeteer from "puppeteer";
import {Browser} from "puppeteer";
import {Options} from "./options";
import {OptionsInterface} from "../interfaces/options";

/**
 * Singleton class (one shared instance)
 */
export class ProvisionedBrowser {

    private _browserInstance: Browser;

    constructor(protected options: Options) {

    }

    public async getBrowserInstance(): Promise<Browser> {

        if (!this._browserInstance) {

            if (this.options.debug) {
                console.log('Create new browser instance');
            }

            this._browserInstance = await puppeteer.launch({
                headless: this.options.getRunMode(),
                ignoreHTTPSErrors: this.options.ignoreHttpErrors(),
                args: [`--window-size=${this.options.getDimensions().width},${this.options.getDimensions().height}`]
            });
        }

        return this._browserInstance;
    }
}