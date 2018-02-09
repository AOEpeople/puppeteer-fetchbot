import {header} from "./header";

let ansi = require('ansi-escape-sequences');

export function manPage() {
    return [
        {
            content: ansi.format(header(), 'red'),
            raw: true
        },
        {
            header: 'APPNAME',
            content: 'A JSON scheme translator to apify any website'
        },
        {
            header: 'Options',
            optionList: [
                {name: 'help', alias: 'h', typeLabel: '[underline]{Boolean}', description: 'Show the help page'},
                {
                    name: 'config',
                    alias: 'c',
                    typeLabel: '[underline]{file}',
                    description: 'Specify the input config file (required)'
                },
                {
                    name: 'headless',
                    alias: 's',
                    typeLabel: '[underline]{Boolean}',
                    description: 'specifies if Chrome should run in headless (silent) mode (optional | default=true)'
                },
                {
                    name: 'directory',
                    alias: 'f',
                    typeLabel: '[underline]{String}',
                    description: 'specifies the directory (folder) where output is stored to (optional | default=none)'
                },
                {
                    name: 'wait',
                    alias: 'd',
                    typeLabel: '[underline]{Number}',
                    description: 'Time to wait (delay) before browser is closed after completion  (optional | default=0)'
                },
                {
                    name: 'trust',
                    alias: 't',
                    typeLabel: '[underline]{Boolean}',
                    description: 'Trust SSL certs which are not verified by a known CA (optional | default=false)'
                },
                {
                    name: 'width',
                    alias: 'w',
                    typeLabel: '[underline]{Number}',
                    description: 'Specifies the browser window width (optional | default=800)'
                },
                {
                    name: 'height',
                    alias: 'h',
                    typeLabel: '[underline]{Number}',
                    description: 'Specifies the browser window height (optional | default=600)'

                },
                {
                    name: 'debug',
                    alias: '',
                    typeLabel: '[underline]{Boolean}',
                    description: 'Determine if debugging and logging is enabled'
                },
            ]
        },
        {
            content: 'Project home: [underline]{https://github.com/aoepeople/appname}'
        }
    ]
}