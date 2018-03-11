import * as puppeteer from "puppeteer";
import {Browser} from "puppeteer";
import {Options} from "./options";
import {OptionsInterface} from "../interfaces/options";

export class ProvisionedBrowser {

    protected _browserInstance: Browser;
    protected options: Options;

    constructor(protected userOptions: OptionsInterface) {
        this.options = new Options(userOptions);
    }

    public async getBrowserInstance(): Promise<Browser> {

        const browserWasStarted = !!this._browserInstance;

        if (!browserWasStarted) {
            this._browserInstance = await puppeteer.launch({
                headless: !this.options.isAttached(),
                ignoreHTTPSErrors: this.options.ignoreHttpErrors(),
                slowMo: this.options.slowmo || 0,
                timeout: 0,

                // More useful args which could be applied here
                // https://peter.sh/experiments/chromium-command-line-switches/
                args: [
                    `--user-agent=${this.options.getUserAgent()}`,
                    '--window-position=0,0',
                    `--window-size=${this.options.getDimensions().width},${this.options.getDimensions().height}`,
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ]
            });
        }

        return this._browserInstance;
    }
}