import * as puppeteer from 'puppeteer';
import {Browser, Page} from "puppeteer";
import {existsSync, readFileSync, writeFileSync} from 'fs';
import {manPage} from './lib/manpage';
import {cmdOptions} from "./lib/cmd-options";
import * as commandLineArgs from 'command-line-args';
import *  as getUsage from 'command-line-usage';


const delayTime: number = 800;
let completed: string[] = [],
    processing: string[] = [];


const options = commandLineArgs(cmdOptions());


if (options.help === true) {
    console.log(getUsage(manPage()));
    process.exit(0);
}

// Set defaults
options.directory = options.directory || null;
options.trust = options.trust || false;
options.headless = options.headless || false;
options.width = options.width || 800;
options.height = options.height || 600;


if (!existsSync(__dirname + '/' + options.config)) {
    throw new Error('Config file not found (' + options.config + ')');
}

let configFile = JSON.parse(readFileSync(__dirname + '/' + options.config, 'UTF-8'));

(async () => {

    async function runChromeAutomisation(link: string,
                                         config: any,
                                         browser: Browser,
                                         page: Page,
                                         rootLevel: boolean = true) {

        let protectedKeys: string[] = [
            'root', // Determine the root node must be unique in processing file

            'fetch' // these objects are evaluated against the page after
                    // modifications have been done and converts into
                    // the selector assigned datatype
        ];

        // URI watcher
        if (rootLevel === true) {
            await page.goto(link);

            //    interval = setInterval(async () => {
            page.on('load', async () => {

                page.waitFor(3000);

                let currentUrl = page.url();


                for (const link of Object.keys(config)) {

                    if (completed.length !== Object.keys(config).length) {

                        let IS_CURRENT_URL: boolean = false;


                        IS_CURRENT_URL = (
                            (
                                currentUrl === link
                                ||
                                currentUrl.toString().match(new RegExp(link)) !== null
                            ) &&
                            !config[link].root &&
                            completed.indexOf(link) === -1 &&
                            processing.indexOf(link) === -1
                        );


                        if (IS_CURRENT_URL) {

                            processing.push(link);

                            if (config[link] instanceof Array) {
                                for (const configPart of config[link]) {
                                    let subConfig = {};
                                    subConfig[link] = configPart;
                                    await runChromeAutomisation(link, subConfig, browser, page, false);
                                }
                            } else {
                                await runChromeAutomisation(link, config, browser, page, false);
                            }

                            completed.push(link);
                            processing.splice(processing.indexOf(link), 1);
                        }
                    }

                    if (completed.length === Object.keys(config).length - 1) {
                        await page.waitFor(options.wait || 0);
                        await page.close();
                        await browser.close();
                        process.exit(0);
                    }
                }
            });
        }


        for (const job of Object.keys(config[link])) {

            let IS_SELECTOR_STRING = (
                protectedKeys.indexOf(job) === -1 &&
                !!page[job] &&
                typeof config[link][job] === 'string'
            );

            let IS_ARGUMENTLIST_FOR_METHOD_CALL = (
                protectedKeys.indexOf(job) === -1 &&
                !!page[job] &&
                config[link][job] instanceof Array
            );

            let IS_PLAIN_METHOD_CALL = (
                protectedKeys.indexOf(job) === -1 &&
                !!page[job] &&
                config[link][job] === null
            );

            let IS_FETCH_JOB = (
                protectedKeys.indexOf(job) !== -1 &&
                !page[job] &&
                job === 'fetch' &&
                typeof config[link][job] === 'object'
            );


            if (IS_SELECTOR_STRING) {
                await page.waitForSelector(config[link][job], {timeout: 5000}); // maybe irrelevant
                await page.waitFor(delayTime);
                page[job](config[link][job]);
            } else if (IS_ARGUMENTLIST_FOR_METHOD_CALL) {
                for (const jobItem of config[link][job]) {
                    await page.waitFor(delayTime);
                    await page[job](...jobItem);
                }
            } else if (IS_PLAIN_METHOD_CALL) {
                await page.waitFor(delayTime * 2);
                await page[job]();
            } else if (IS_FETCH_JOB) {
                const result = await page.evaluate((fetchItems) => {

                    let data = {};
                    const DOM = document.body;

                    // Here the methods are not recognized and therefore commented out due to warning supression

                    // TODO Selector as property in Object
                    for (const  originSelector of Object.keys(fetchItems)) {
                        let SELECTOR_INDEX = 1,
                            PROPERTYNAME_INDEX = 2,
                            selector = originSelector,
                            propertyName = selector,
                            hasPropertyNameRegExp: RegExp = new RegExp(' as '),
                            extractSelectorAndPropertyName: RegExp = new RegExp('(\\S+)\\sas\\s(\\S+)');


                        // has selector ' as ' matching pattern
                        if (propertyName.match(hasPropertyNameRegExp) !== null) {
                            // no.. take it as it is
                            // yes cut -> create data and selector

                            let extraction = propertyName.match(extractSelectorAndPropertyName);

                            propertyName = extraction[PROPERTYNAME_INDEX];
                            selector = extraction[SELECTOR_INDEX];

                        }

                        data[propertyName] = fetchItems[originSelector];

                        if (data[propertyName] instanceof Array) {
                            const nodeList: any /*NodeList*/ = DOM.querySelectorAll(selector);
                            nodeList.forEach((node: any /*ChildNode*/) => {
                                data[propertyName].push(node.textContent.trim());
                            });
                        } else if (typeof data[propertyName] === 'string') {
                            const node: any /*ChildNode*/ = DOM.querySelector(selector);
                            data[propertyName] = node.textContent.trim();
                        } else if (typeof data[propertyName] === 'number') {
                            const node: any /*ChildNode*/ = DOM.querySelector(selector);
                            data[propertyName] = parseInt(node.textContent, 10);
                        } else if (data[propertyName] === null) {
                            const nodeList: any /*NodeList*/ = DOM.querySelectorAll(selector);
                            data[propertyName] = [];
                            nodeList.forEach((node: any /*ChildNode*/) => {
                                data[propertyName].push(parseInt(node.textContent, 10));
                            });
                        } else if (data[propertyName] === false) {
                            const node: any /*ChildNode */ = DOM.querySelector(selector);

                            data[propertyName] = (node !== null);
                        }
                    }

                    console.log(data);
                    return data;

                }, config[link][job]);

                if (!!options.directory) {
                    let fileName =
                        options.directory +
                        '/' +
                        new Date().getTime().toString() +
                        '-' +
                        link
                            .replace(/^(http|https):\/\//, '')
                            .replace(/\//g, '_') +
                        '.json',

                        data = JSON.stringify(result, null, '\t');

                    writeFileSync(
                        fileName, data, 'UTF-8'
                    );

                    console.log(fileName);

                } else {
                    console.log(result);
                }
            }
        }
    }

    let rootUrls: string[] = Object.keys(configFile)
        .filter((url) => {
            return configFile[url].root === true;
        });


    if (rootUrls.length === 0) {
        throw new Error('There must be exactly one root in the config (root=true)');
    }

    const browser = await puppeteer.launch({
            headless: options.headless,
            ignoreHTTPSErrors: options.trust,
            args: [`--window-size=${options.width},${options.height}`] // added option
        }),

        page = await browser.newPage();


    await page.setViewport({
        width: options.width,
        height: options.height
    });

    for (const rootUrl of rootUrls) {
        try {
            await runChromeAutomisation(rootUrl, configFile, browser, page);
        } catch (error) {
            console.log(error);
        }
    }
})();
