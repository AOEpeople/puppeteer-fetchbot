import {OperationalPage} from "./operational-page";
import {Options} from "./options";
import {isAllowedCmd} from "../helpers/is-allowed-cmd";
import {isSelectorStringCmd} from "../helpers/is-selector-string-cmd";
import {isCallWithArgs} from "../helpers/is-called-with-args";
import {isCallNoArgs} from "../helpers/is-called-no-args";
import {isFetchJobCmd} from "../helpers/is-fetch-job-cmd";
import {Fetcher} from "./fetcher";
import {OptionsInterface} from "../interfaces/options";
import {readFileSync} from "fs";

export class Bot extends OperationalPage {

    public tour: Object;

    private fetchedData = {};

    constructor(tour: Object | string, protected userOptions: OptionsInterface) {

        super(userOptions)

        if (typeof tour === 'string') {
            try {
                this.tour = JSON.parse(readFileSync(tour, 'utf-8'));
            } catch (error) {
                throw new Error('Cannot read tour file (Does it exist or is it valid JSON?)')
            }
        } else {
            this.tour = tour;
        }
    }

    public async run() {

        let completed;
        try {
            await this._batchTasks(this._getTasks(true), true);
        } catch (error) {
            if (this.options.debug === true) {
                console.log(error);
            }
        }


        await this.exit();


        return this.fetchedData;
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
                let fetchedData = await new Fetcher(scope).pull(options);
                Object.assign(this.fetchedData, fetchedData);
                break;
            default:
                break;
        }
    }

    private async _batchTask(task: any, gotoResource: boolean = false): Promise<Boolean> {
        let resource = Object.keys(task)[0],
            page = await this.getPageInstance();

        if (gotoResource) {
            await page.goto(resource);
        }

        await this._execution(task[resource]);

        await page.waitFor(this.options.wait);

        return true;
    }

    private async _batchTasks(tasks: any[], root: boolean = false): Promise<boolean> {
        const currentTasks = tasks.pop();

        await this._batchTask(currentTasks, root);

        let page = await this.getPageInstance();
        let matchingTasks = this._getUrlMatchingTasks(page.url(), this._getTasks(false));

        if (matchingTasks.length > 0) {
            await this._batchTasks(matchingTasks, false);
        }

        if (tasks.length > 0) {
            return await this._batchTasks(tasks, root);
        } else {
            return true;
        }
    }

    private _deleteJob(resource: string): void {
        delete this.tour[resource];
    }

    private _hasRootTask() {
        return Object.keys(this.tour).some((resource: string) => {
            return this.tour[resource].root === true;
        });
    }

    private _getTasks(root: boolean = false): any[] {
        let tasks = [];

        if (root === true && !this._hasRootTask()) {
            throw new Error('The configuration job configuration has no root jobs');
        }

        Object
            .keys(this.tour)

            .filter((resource: string) => {
                return (root === true) ? this.tour[resource].root === true : !this.tour[resource].root;
            })

            .forEach((resource: string) => {
                let task = {};

                task[resource] = this.tour[resource];

                if (root) {
                    this._deleteJob(resource);
                }

                tasks.push(task);
            });

        return tasks.reverse();
    }

    private _getUrlMatchingTasks(url: string, tasks: any[]): any[] {

        tasks = tasks
            .filter((task: Object) => {
                const taskAppliancePattern: string = Object.keys(task)[0];

                const urlHasMatch = url.toLocaleLowerCase().indexOf(taskAppliancePattern.toLocaleLowerCase()) === 0;
                const urlHasRegExpMatch = url.match(new RegExp(taskAppliancePattern, 'i')) !== null;


                if (!urlHasMatch && !urlHasRegExpMatch) {
                    return false;
                }

                this._deleteJob(taskAppliancePattern);

                return urlHasMatch || urlHasRegExpMatch
            });

        return tasks;
    }

}