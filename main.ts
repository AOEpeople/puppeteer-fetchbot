import {existsSync, readFileSync} from 'fs';
import {manPage} from './lib/manpage';
import {cmdOptions} from "./lib/cmd-options";
import {automator} from "./lib/automator";
import * as commandLineArgs from 'command-line-args';
import *  as getUsage from 'command-line-usage';

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

    let rootUrls: string[] = Object
        .keys(configFile)
        .filter((url) => {
            return configFile[url].root === true;
        });

    if (rootUrls.length === 0) {
        throw new Error('There must be exactly one root in the config (root=true)');
    }

    for (const rootUrl of rootUrls) {
        try {
            await automator(options, rootUrl, configFile);
        } catch (error) {
            console.log(error);
        }
    }
})();
