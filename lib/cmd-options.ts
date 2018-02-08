export function cmdOptions() {
    return [
        {name: 'help', type: Boolean},
        {name: 'config', alias: 'c', type: String},
        {name: 'headless', alias: 's', type: Boolean},
        {name: 'directory', alias: 'f', type: String},
        {name: 'wait', alias: 'd', type: Number},
        {name: 'trust', alias: 't', type: Boolean},
        {name: 'width', alias: 'w', type: Number},
        {name: 'height', alias: 'h', type: Number},
    ];
}