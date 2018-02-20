import {OptionsInterface} from "../interfaces/options";

export class Options implements OptionsInterface {

    headless: boolean;
    trust: boolean;
    width: number;
    height: number;
    wait: number;
    debug: boolean;
    slowmo: number;

    constructor(options) {
        this.headless = options.headless === true;
        this.trust = options.trust === true;
        this.width = (typeof options.width === 'number') ? options.width : 800;
        this.height = (typeof options.height === 'number') ? options.height : 600;
        this.wait = (typeof options.wait === 'number') ? options.wait : 750;
        this.slowmo = (typeof options.slowmo === 'number') ? options.slowmo : 0;
        this.debug = options.debug === true;
    }

    public getAll(): OptionsInterface {
        return {
            headless: this.headless,
            trust: this.trust,
            width: this.width,
            height: this.height,
            wait: this.wait,
            slowmo: this.slowmo,
            debug: this.debug
        };
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