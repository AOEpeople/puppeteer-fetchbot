import * as puppeteer from "puppeteer";
import {Browser} from "puppeteer";
import {Options} from "./options";

/**
 * Singleton class (one shared instance)
 */
export class ProvisionedBrowser {

    protected _browserInstance: Browser;

    constructor(protected options: Options) {
    }

    public async getBrowserInstance(): Promise<Browser> {

        const browserWasStarted = !!this._browserInstance;

        if (!browserWasStarted) {
            this._browserInstance = await puppeteer.launch({
                headless: this.options.getRunMode(),
                ignoreHTTPSErrors: this.options.ignoreHttpErrors(),
                //slowMo: 250,
                args: [`--window-size=${this.options.getDimensions().width},${this.options.getDimensions().height}`]
            });
        }

        return this._browserInstance;
    }
}