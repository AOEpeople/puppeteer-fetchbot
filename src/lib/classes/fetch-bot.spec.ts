import {expect} from 'chai';
import {FetchBot} from "./fetch-bot";
import {realpathSync} from "fs";
import {Options} from "./options";

describe('FetchBot', () => {
    const fakeUrl = 'file://' + realpathSync(__dirname + '"/../../../mocks/gitHubPage.htm');
    const targetUrl = 'file://';// + realpathSync(__dirname + '"/../../../mocks/link-target.html');
    const options = {};
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
        tour[targetUrl] = [
            {
                reload: null,
                waitFor: [
                    [delay]
                ],
                fetch: {
                    '#linkTargetResolved as completed': false,
                    '#linkTargetResolved as attributeIsWorking': {'attr': 'align', 'type': ''},
                    '#linkTargetResolved as attributeAlignExists': {'attr': 'align', 'type': false},
                    '#linkTargetResolved as dataTestIsWorking': {'attr': 'data-test', 'type': ''}
                }
            },
            {
                waitFor: [
                    [delay / 10]
                ],
                fetch: {
                    'h2.xyz as collectedIds': {'attr': 'id', 'type': null},
                    'h2.xyz as collectedClassNames': {'attr': 'class', 'type': []}
                }
            }
        ];

        bot = new FetchBot(tour, options);
        data = await bot.run();

        expect(data['completed']).to.equal(true);
        expect(data['attributeIsWorking']).to.equal('yes');
        expect(data['attributeAlignExists']).to.equal(true);
        expect(data['collectedIds']).to.deep.equal([123, 456]);
        expect(data['collectedClassNames']).to.deep.equal(['xyz', 'xyz']);
        expect(data['dataTestIsWorking']).to.equal('working');

    }).timeout(10000);

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
            bot = new FetchBot(tour, options);

        data = await bot.run();

        expect(data).to.deep.equal(expectedData);

    }).timeout(30000);

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


        let bot = new FetchBot(tour, options);

        await bot.run();

        expect(Object.keys(tour).length).to.equal(0);

    }).timeout(10000);

    it('Should resolve the root tours and then match the followed url by RegExp', async () => {

        tour = {};

        tour[fakeUrl] = {
            root: true,
            click: 'a.header-logo-invertocat'
        };

        tour['.html'] = {
            fetch: {
                "#uniqueId as uid": ''
            }
        };


        let bot = new FetchBot(tour, options);

        let result:any = await bot.run();

        expect(result.uid).to.equal('BBB');

    }).timeout(10000);

    it('Should resolve the root and finally have one non matching item in the job list', async () => {

        tour = {};

        tour[fakeUrl] = {
            root: true,
            lalala: [
                ['#sdfdsd']
            ]
        };

        tour['http://some.fantasy.domain.com/never-matching.html'] = {
            lalala: [
                ['#sdfdsd']
            ]
        };


        let bot = new FetchBot(tour, options);

        await bot.run();

        expect(Object.keys(tour).length).to.equal(1);

    }).timeout(10000);

    it('Should load an existing config via file (from examples folder)', async () => {
        //TODO This tests isn't working in headless mode
        let bot = new FetchBot(realpathSync(__dirname + '/../../../examples/tour-via-file-for-tests.json'), options);

        let result = await bot.run();

        // TODO This test isn't working in headless mode because "chrome://credits/" is served as blank page
        // expect(result['links'] instanceof Array).to.equal(true);
        // expect(result['links'].length).to.be.greaterThan(0);
        expect(Object.keys(result).length).to.equal(0);

    }).timeout(10000);

    it('Should fail when loading a not existing config file', async () => {

        try {
            new FetchBot('this-file-does-not-exist.json', options);
        } catch (error) {
            expect(error.message).to.equal('Cannot read tour file (Does it exist or is it valid JSON?)');
        }


    }).timeout(10000);

    it('Should fail when no root object is present', async () => {
        try {
            let fetchBot = new FetchBot({"https://some.sub.domain/page.html": {}}, options);

            await fetchBot.run();

        } catch (error) {
            expect(error.message).to.equal('The configuration job configuration has no root jobs');
        }
    });
});