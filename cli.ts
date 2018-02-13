import {manPage} from './lib/cli/manpage';
import {cmdOptions} from "./lib/cli/cmd-options";

import * as commandLineArgs from 'command-line-args';
import *  as getUsage from 'command-line-usage'

const options = commandLineArgs(cmdOptions());

if (options.help === true) {
    console.log(getUsage(manPage()));
    process.exit(0);
}