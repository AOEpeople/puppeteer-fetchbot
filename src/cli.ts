import {manPage} from './lib/cli/manpage';
import {cmdOptions} from "./lib/cli/cmd-options";
import {existsSync, readFileSync, writeFileSync} from "fs";

import * as commandLineArgs from 'command-line-args';
import *  as getUsage from 'command-line-usage'
import {Bot} from "./lib/classes/bot";

const options = commandLineArgs(cmdOptions());
let job;


if (options.help === true) {
    console.log(getUsage(manPage()));
    process.exit(0);
}

if (!existsSync(options.job)) {
    throw new Error('No job file specified (' + options.job + ')');
}

try {
    job = JSON.parse(readFileSync(options.job, 'utf-8'));
} catch (error) {
    throw new Error('No job file specified');
}

let bot = new Bot(job, options);

console.log('🚀  FetchBot is launching...');
console.log('🕘  Please wait a moment...');


bot.run()
    .then((fetchedData) => {

        console.log('🏁  Completed');

        let parsedData = JSON.stringify(fetchedData, null, '\t');

        if (!!options.output) {
            console.log('🙌  Grabbed data has been stored in ' + options.output);
            writeFileSync(options.output, parsedData, 'utf-8');
        } else {
            console.log('🙌  Here\'s your grabbed data\n');
            console.log(parsedData);
        }

        process.exit(0);
    });




