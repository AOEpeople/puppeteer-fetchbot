import {expect} from 'chai';
import {OperationalPage} from "./operational-page";
import {Options} from "./options";
import {Page} from "puppeteer";


describe('OperationalPage', () => {


    it('Should create a new page object and keep within the instance', async () => {

        let page = new OperationalPage(new Options({headless: true}));

        expect(typeof page).to.equal('object');

        let pageInstance = await page.getPageInstance();
        expect(typeof pageInstance).to.equal('object');
    });
});
