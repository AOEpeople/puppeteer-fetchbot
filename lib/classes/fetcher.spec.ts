import {expect} from 'chai';
import {Fetcher} from "./fetcher";
import {OperationalPage} from "./operational-page";
import {Options} from "./options";
import {getSelectorAndPropertyName} from "../helpers/get-selector-and-property-name";
import {realpathSync} from "fs";

describe('Fetcher', () => {

    //const url = 'https://github.com/BernhardBezdek';
    // load the html mockfile instead
    const url = 'file://' + realpathSync(__dirname + '/../../mock/gitHubPage.htm');


    const fetchJobs = {
        BOOLEAN: {".user-mention as booleanExample": false},
        STRING: {".user-mention as stringExample": ''},
        NUMBER: {".Counter as numberExample": 0},
        ARRAY_CONTAINING_STRINGS: {".repo as stringArrayExample": []},
        ARRAY_CONTAINING_NUMBERS: {".Counter as numberArrayExample": null}
    };


    it('Should pull specified data (via selector) from page and provide as "boolean" [excluded from coverage]', async () => {

        // TODO Excluded yet in coverage reports (@see package.json nyc config)
        // TODO due to context/evaluation issues
        // Maybe solvable by https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
        const operationalPage = new OperationalPage(new Options({headless: true}));
        const page = await operationalPage.getPageInstance();
        const fetcher = new Fetcher(page);

        let data,
            asPropertyName: string;

        await page.goto(url);

        //TYPE BOOLEAN
        data = await fetcher.pull(fetchJobs.BOOLEAN);
        asPropertyName = getSelectorAndPropertyName(Object.keys(fetchJobs.BOOLEAN)[0]).property;
        expect(data[asPropertyName]).to.equal(true);

        await operationalPage.exit();

    }).timeout(5000);

    it('Should pull specified data (via selector) from page and provide as "string" [excluded from coverage]', async () => {

        // TODO Excluded yet in coverage reports (@see package.json nyc config)
        // TODO due to context/evaluation issues
        // Maybe solvable by https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
        const operationalPage = new OperationalPage(new Options({headless: true}));
        const page = await operationalPage.getPageInstance();
        const fetcher = new Fetcher(page);
        let data,
            asPropertyName: string;

        await page.goto(url);

        // TYPE STRING
        data = await fetcher.pull(fetchJobs.STRING);
        asPropertyName = getSelectorAndPropertyName(Object.keys(fetchJobs.STRING)[0]).property;
        expect(data[asPropertyName]).to.equal('@AOEpeople');


        await operationalPage.exit();

    }).timeout(5000);

    it('Should pull specified data (via selector) from page and provide as "number" [excluded from coverage]', async () => {

        // TODO Excluded yet in coverage reports (@see package.json nyc config)
        // TODO due to context/evaluation issues
        // Maybe solvable by https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
        const operationalPage = new OperationalPage(new Options({headless: true}));
        const page = await operationalPage.getPageInstance();
        const fetcher = new Fetcher(page);
        let data,
            asPropertyName: string;

        await page.goto(url);

        // TYPE NUMBER
        data = await fetcher.pull(fetchJobs.NUMBER);
        asPropertyName = getSelectorAndPropertyName(Object.keys(fetchJobs.NUMBER)[0]).property;
        expect(data[asPropertyName]).to.equal(19); // Amount of repositories

        await operationalPage.exit();

    }).timeout(5000);

    it('Should pull specified data (via selector) from page and provide as "array of string(s)" [excluded from coverage]', async () => {

        // TODO Excluded yet in coverage reports (@see package.json nyc config)
        // TODO due to context/evaluation issues
        // Maybe solvable by https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
        const operationalPage = new OperationalPage(new Options({headless: true}));
        const page = await operationalPage.getPageInstance();
        const fetcher = new Fetcher(page);
        let data,
            asPropertyName: string;

        await page.goto(url);


        //TYPE ARRAY_CONTAINING_STRINGS
        data = await fetcher.pull(fetchJobs.ARRAY_CONTAINING_STRINGS);
        asPropertyName = getSelectorAndPropertyName(Object.keys(fetchJobs.ARRAY_CONTAINING_STRINGS)[0]).property;
        expect(data[asPropertyName] instanceof Array).to.equal(true);
        expect(typeof data[asPropertyName][0]).to.equal('string');
        expect(data[asPropertyName].length).to.equal(6);


        await operationalPage.exit();

    }).timeout(5000);

    it('Should pull specified data (via selector) from page and provide as "array of number(s)" [excluded from coverage]', async () => {

        // TODO Excluded yet in coverage reports (@see package.json nyc config)
        // TODO due to context/evaluation issues
        // Maybe solvable by https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
        const operationalPage = new OperationalPage(new Options({headless: true}));
        const page = await operationalPage.getPageInstance();
        const fetcher = new Fetcher(page);
        let data,
            asPropertyName: string;

        await page.goto(url);

        //TYPE ARRAY_CONTAINING_NUMBERS
        data = await fetcher.pull(fetchJobs.ARRAY_CONTAINING_NUMBERS);
        asPropertyName = getSelectorAndPropertyName(Object.keys(fetchJobs.ARRAY_CONTAINING_NUMBERS)[0]).property;
        expect(data[asPropertyName] instanceof Array).to.equal(true);
        expect(typeof data[asPropertyName][0]).to.equal('number');
        expect(data[asPropertyName].length).to.equal(4);

        await operationalPage.exit();

    }).timeout(5000);
});