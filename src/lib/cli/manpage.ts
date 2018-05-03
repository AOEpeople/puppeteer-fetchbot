import {header} from "./header";

let ansi = require('ansi-escape-sequences');

export function manPage() {
    return [
        {
            content: ansi.format(header(), 'red'),
            raw: true
        },
        {
            header: 'FetchBot (1.4.10)',
            content: 'Library and shell-command that provides a simple JSON-API to perform human like interactions and data extractions on any website. Built on top of puppeteer'
        },
        {
            header: 'Options',
            optionList: [

                {
                    name: 'job',
                    typeLabel: '{underline file}',
                    description: 'Input job file (mandatory)'
                },

                {
                    name: 'agent',
                    typeLabel: '{underline String}',
                    description: 'The user agent string (default FetchBot-1.4.10)'
                },

                {
                    name: 'trust',
                    typeLabel: '{underline Boolean}',
                    description: 'Trust SSL certs which are not verified by a known CA (optional | default=false)'
                },

                {
                    name: 'width',
                    typeLabel: '{underline Number}',
                    description: 'Specifies the browser window width (optional | default=800)'
                },
                {
                    name: 'height',
                    typeLabel: '{underline Number}',
                    description: 'Specifies the browser window height (optional | default=600)'

                },

                {
                    name: 'wait',
                    typeLabel: '{underline Number}',
                    description: 'Time  in ms to delay execution after each command (optional | default=750)'

                },

                {
                    name: 'attached',
                    typeLabel: '{underline Boolean}',
                    description: 'Specifies if Chromium/Chrome should run in attached mode (non headless) (optional | default=false)'
                },

                {
                    name: 'wait',
                    typeLabel: '{underline Number}',
                    description: 'Time to wait (delay) before browser is closed after completion  (optional | default=0)'
                },
                {
                    name: 'slowmo',
                    typeLabel: '{underline Number}',
                    description: 'Slow down the execution speed in ms (optional | default=0)'
                },
                {
                    name: 'debug',
                    typeLabel: '{underline Boolean}',
                    description: 'Enables debugging and logging'
                },

                {
                    name: 'output',
                    typeLabel: '{underline String}',
                    description: 'Filename where fetched content is stored'
                },
                {
                    name: 'help',
                    typeLabel: '{underline Boolean}',
                    description: 'Show the help page'
                },
            ]
        },
        {
            content: 'Project home: {underline https://github.com/AOEpeople/puppeteer-fetchbot}'
        }
    ]
}