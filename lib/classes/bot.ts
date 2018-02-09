import {OperationalPage} from "./operational-page";
import {Options} from "./options";
import {isAllowedCmd} from "../helpers/is-allowed-cmd";
import {isSelectorStringCmd} from "../helpers/is-selector-string-cmd";
import {isCallWithArgs} from "../helpers/is-called-with-args";
import {isCallNoArgs} from "../helpers/is-called-no-args";
import {isFetchJobCmd} from "../helpers/is-fetch-job-cmd";

export class Bot extends OperationalPage {

    public job: any;

    constructor(protected options: Options) {
        super(options);

        this.job = options.config;
    }

    public async run() {

        let completed;

        try {
            await this._batchTasks(this._getRootTasks());
        } catch (error) {
            if (this.options.debug === true) {
                console.log(error.message);
            }
        }

        completed = await this.exit();


        if (completed && this.options.debug) {
            console.log('Bot completed');
        }

        return {};
    }

    private async _getCmdType(command: string, params: any): Promise<string> {

        const page = await this.getPageInstance();
        const isPageCommand = !!page[command];

        let commandType: string;

        if (isSelectorStringCmd(isPageCommand, params)) {
            commandType = 'selector';
        } else if (isCallWithArgs(isPageCommand, params)) {
            commandType = 'call';
        } else if (isCallNoArgs(isPageCommand, params)) {
            commandType = 'callnoargs';
        } else if (isFetchJobCmd(isPageCommand, params, command)) {
            commandType = 'fetch';
        } else {
            commandType = 'unknown-command';
        }

        return commandType;
    }

    private async _execution(commands: any) {
        for (const command of Object.keys(commands)) {
            if (isAllowedCmd(command)) {
                await this._exec(command, commands[command]
                );
            }
        }
    }

    private async _exec(command: string, options: any) {

        const scope = await this.getPageInstance();
        const cmdType = await this._getCmdType(command, options);

        // TODO More performant using enums?!?

        switch (cmdType) {

            case 'selector':
                await scope[command](options);
                break;

            case 'call':
                for (const option of options) {
                    await scope[command](...option);
                }
                break;

            case 'callnoargs':
                await scope[command]();
                break;

            case 'fetch':
                break;

            default:
                break;
        }
    }

    private async _batchTask(rootTask: any): Promise<Boolean> {
        let resource = Object.keys(rootTask)[0],
            page = await this.getPageInstance();

        await page.goto(resource);

        // Listener mus be started here because once things will change bot must recognize that
        // but first we apply commands for currently applied domain

        await this._execution(rootTask[resource]);

        // await page.waitFor(3000);

        return true;
    }

    private async _batchTasks(rootTasks: any[]): Promise<boolean> {
        const currentRootTask = rootTasks.pop();

        if (this.options.debug === true) {
            console.log('Process root task ' + rootTasks.length + ' tasks remaining');
        }

        await this._batchTask(currentRootTask);

        if (rootTasks.length > 0) {
            console.log('fehler beseitigt');
            return await this._batchTasks(rootTasks);
        } else {
            return true;
        }
    }


    private _deleteRootJob(resource: string): void {
        delete this.job[resource];
    }

    private _hasRootTask() {
        return Object.keys(this.job).some((resource: string) => {
            return this.job[resource].root === true;
        });
    }

    private _getRootTasks(): any[] {
        let rootTasks = [];

        if (!this._hasRootTask()) {
            throw new Error('The configuration job configuration has no root jobs');
        }


        Object
            .keys(this.job)

            .filter((resource: string) => {
                return this.job[resource].root === true;
            })

            .forEach((resource: string) => {
                let rootTask = {};

                rootTask[resource] = this.job[resource];

                this._deleteRootJob(resource);

                rootTasks.push(rootTask);
            });

        return rootTasks.reverse();
    }
}