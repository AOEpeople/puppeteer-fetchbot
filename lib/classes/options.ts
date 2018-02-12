import {OptionsInterface} from "../../interfaces/options";

export class Options implements OptionsInterface {

    headless: boolean;
    wait: number;
    trust: boolean;
    width: number;
    height: number;
    debug: boolean;

    constructor(options) {
        this.headless = options.headless === true;
        this.wait = options.wait || 0;
        this.trust = options.trust === true;
        this.width = (typeof options.width === 'number') ? options.width : 800;
        this.height = (typeof options.height === 'number') ? options.height : 600;
        this.debug = options.debug === true;
    }

    public getAll(): OptionsInterface {
        return {
            headless: this.headless,
            wait: this.wait,
            trust: this.trust,
            width: this.width,
            height: this.height,
            debug:this.debug
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