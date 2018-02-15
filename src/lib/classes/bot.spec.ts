import {expect} from 'chai';
import {Bot} from "./bot";
import {realpathSync} from "fs";
import {Options} from "./options";

describe('Bot', () => {
    const fakeUrl = 'file://' + realpathSync(__dirname + '"/../../../mocks/gitHubPage.htm');
    const targetUrl = 'file://' + realpathSync(__dirname + '"/../../../mocks/link-target.html');
    const options = {headless: true};
    const expectedData = {
        booleanExample: true,
        stringExample: '@AOEpeople',
        numberExample: 19,
        stringArrayExample: [
            'ihave.to',
            'omm',
            'appstack.io',
            'clrlog',
            'traider.io',
            'grunt-ssh-deploy'],
        numberArrayExample: [19, 19, 4, 14]
    };

    let tour = {};


    it('Should open the mock page, fill the input, click the logo and navigate to target page where content is verified', async () => {
        //unit-test.via.config-file.json
        let bot,
            data,
            delay = 100;

        tour = {};
        tour[fakeUrl] = {
            root: true,
            type: [
                [
                    'body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.HeaderMenu--bright.d-flex.flex-justify-between.flex-auto > div > div > div > form > label > input.form-control.header-search-input.js-site-search-focus',
                    'Hello World'
                ]
            ],
            click: 'a.header-logo-invertocat'
        };
        tour[targetUrl] = {
            reload: null,
            waitFor: [
                [delay]
            ],
            fetch: {
                '#linkTargetResolved as completed': false,
                '#linkTargetResolved as attributeIsWorking': {'attr': 'align', 'type': ''},
                '#linkTargetResolved as attributeAlignExists': {'attr': 'align', 'type': false},
                '#linkTargetResolved as dataTestIsWorking': {'attr': 'data-test', 'type': ''},
                'h2.xyz as collectedIds': {'attr': 'id', 'type': null},
                'h2.xyz as collectedClassNames': {'attr': 'class', 'type': []}
            }
        };

        bot = new Bot(tour, options);
        data = await bot.run();

        expect(data['completed']).to.equal(true);
        expect(data['attributeIsWorking']).to.equal('yes');
        expect(data['attributeAlignExists']).to.equal(true);
        expect(data['collectedIds']).to.deep.equal([123, 456]);
        expect(data['collectedClassNames']).to.deep.equal(['xyz', 'xyz']);
        expect(data['dataTestIsWorking']).to.equal('working');

    }).timeout(5000);

    it('Should fetch a set of data', async () => {

        tour = {};

        tour[fakeUrl] = {
            root: true,
            fetch: {
                ".user-mention as booleanExample": false,
                ".user-mention as stringExample": '',
                ".Counter as numberExample": 0,
                ".repo as stringArrayExample": [],
                ".Counter as numberArrayExample": null
            }
        };

        let data,
            bot = new Bot(tour, options);

        data = await bot.run();

        expect(data).to.deep.equal(expectedData);

    }).timeout(50000);

    it('Should resolve all root tours and finally have an empty tour list', async () => {

        tour = {};

        tour[fakeUrl] = {
            root: true,
            lalala: [
                ['#sdfdsd']
            ]
        };

        tour[targetUrl] = {
            root: true,
            lalala: [
                ['#sdfdsd']
            ]
        };


        let bot = new Bot(tour, options);

        await bot.run();

        expect(Object.keys(tour).length).to.equal(0);

    }).timeout(5000);

    it('Should load an existing config via file (from examples folder)', async () => {
        //TODO This tests isn't working in headless mode
        let bot = new Bot(realpathSync(__dirname + '/../../../examples/tour-via-file-for-tests.json'), options);

        let result = await bot.run();

        // TODO This test isn't working in headless mode because "chrome://credits/" is served as blank page
        // expect(result['links'] instanceof Array).to.equal(true);
        // expect(result['links'].length).to.be.greaterThan(0);
        expect(Object.keys(result).length).to.equal(0);

    }).timeout(5000);

    it('Should fail when loading a not existing config file', async () => {

        try {
            new Bot('this-file-does-not-exist.json', options);
        } catch (error) {
            expect(error.message).to.equal('Cannot read tour file (Does it exist or is it valid JSON?)');
        }


    }).timeout(5000);
});