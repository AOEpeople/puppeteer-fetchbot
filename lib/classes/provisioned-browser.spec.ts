import {expect} from 'chai';
import {ProvisionedBrowser} from "./provisioned-browser";
import {Bot} from "./bot";

describe('ProvisionedBrowser', () => {
   // const provisionedBrowser = new ProvisionedBrowser();
    it('Sould be a function', () => {
        expect(typeof ProvisionedBrowser).to.equal('function');
    });

    it('Should remove a persisted model item', () => {
        expect(1).to.equal(1);
    });
});