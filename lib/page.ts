import {ProvisionedBrowser} from "./browser";
import {Browser, Page} from "puppeteer";


export class OperationalPage extends ProvisionedBrowser {

    private _page: Page;

    public async getPageInstance(): Promise<Page> {

        if (!this._page) {
            const browser = await this.getBrowserInstance();

            if (this.options.debug) {
                console.log('Create new page instance');
            }

            this._page = await browser.newPage();

            await this._page.setViewport({
                width: this.options.getDimensions().width,
                height: this.options.getDimensions().height
            });
        }

        return this._page;
    }

    public async exit(): Promise<boolean> {
        try {

            const browser = await this.getBrowserInstance();

            if (!!this._page) {
                await this._page.close();
            }

            await browser.close();

            return true;

        } catch (error) {

            if (this.options.debug === true) {
                console.log(error);
            }

            return false;
        }
    }
}