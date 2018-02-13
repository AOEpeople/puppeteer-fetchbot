import {expect} from 'chai';
import {Bot} from "./bot";
import {realpathSync} from "fs";
import {Options} from "./options";

describe('Bot', () => {
    const fakeUrl = 'file://' + realpathSync(__dirname + '/../../mock/gitHubPage.htm');
    const targetUrl = 'file://' + realpathSync(__dirname + '/../../mock/link-target.html');
    const options = new Options({headless: true});
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
                '#linkTargetResolved as completed': false
            }
        };

        bot = new Bot(tour, options);
        data = await bot.run();


        expect(data['completed']).to.deep.equal(true);

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
});