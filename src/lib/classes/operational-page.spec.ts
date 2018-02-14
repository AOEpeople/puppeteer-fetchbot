import {expect} from 'chai';
import {OperationalPage} from "./operational-page";
import {Options} from "./options";


describe('OperationalPage', () => {

    it('Should create a new page object and keep within the instance', async () => {
        let page = new OperationalPage({headless: true});


        let pageInstance = await page.getPageInstance();

        await page.exit();

        expect(typeof pageInstance.waitFor).to.equal('function');
    });
});
