import {ProvisionedBrowser} from "./provisioned-browser";
import {Page} from "puppeteer";


export class OperationalPage extends ProvisionedBrowser {

    private _page: Page;

    public async getPageInstance(): Promise<Page> {

        const pageWasInitialized = !!this._page;

        if (!pageWasInitialized) {
            this._browserInstance = await this.getBrowserInstance();
            this._page = await this._browserInstance.newPage();

            await this._page.setViewport({
                width: this.options.getDimensions().width,
                height: this.options.getDimensions().height
            });
        }

        return this._page;
    }

    public async exit(): Promise<boolean> {
        try {
            if (!!this._page) {
                await this._page.close();
                await this._browserInstance.close();
                await this._browserInstance.disconnect();
            }
        } catch (error) {
            return false;
        }

        return true;
    }
}