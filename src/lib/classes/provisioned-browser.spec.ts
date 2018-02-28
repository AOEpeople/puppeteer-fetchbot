import {expect} from 'chai';
import {ProvisionedBrowser} from "./provisioned-browser";
import {Options} from "./options";


describe('ProvisionedBrowser', () => {

    const provisionedBrowser = new ProvisionedBrowser(new Options({}));


    it('Should fetch a new browser instance and close these immediately', async () => {
        let browserInstance = await provisionedBrowser.getBrowserInstance();

        expect(typeof browserInstance.close).to.equal('function');

        await  browserInstance.close();
        await  browserInstance.disconnect();
    }).timeout(10000);
});