import {OptionsInterface} from "../interfaces/options";

export class Options implements OptionsInterface {
    config: any;
    help: boolean;
    headless: boolean;
    directory: string;
    wait: number;
    trust: boolean;
    width: number;
    height: number;
    debug: boolean;

    constructor(options) {
        this.help = options.help === true;
        this.headless = options.headless === true;
        this.directory = options.directory || null;
        this.wait = options.wait || 0;
        this.trust = options.trust === true;
        this.config = options.config || {};
        this.width = (typeof options.width === 'number') ? options.width : 800;
        this.height = (typeof options.height === 'number') ? options.height : 600;
        this.debug = options.debug === true;
    }

    public getAll(): OptionsInterface {
        return {
            config: this.config,
            help: this.help,
            headless: this.headless,
            directory: this.directory,
            wait: this.wait,
            trust: this.trust,
            width: this.width,
            height: this.height
        };
    }

    public helpRequest() {
        return this.getAll().help === true;
    }

    public getDimensions() {
        return {width: this.getAll().width, height: this.getAll().height};
    }

    public getWidth(): number {
        return this.getAll().width;
    }

    public getHeight(): number {
        return this.getAll().height;
    }

    public getRunMode(): boolean {
        return this.getAll().headless;
    }

    public ignoreHttpErrors(): boolean {
        return this.getAll().trust;
    }
}