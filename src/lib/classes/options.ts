import {OptionsInterface} from "../interfaces/options";

export class Options implements OptionsInterface {

    attached: boolean;
    trust: boolean;
    width: number;
    height: number;
    wait: number;
    debug: boolean;
    slowmo: number;
    agent: string;

    constructor(options) {
        this.attached = options.attached === true || false;
        this.trust = options.trust === true;
        this.width = (typeof options.width === 'number') ? options.width : 1024;
        this.height = (typeof options.height === 'number') ? options.height : 768;
        this.wait = (typeof options.wait === 'number') ? options.wait : 750;
        this.slowmo = (typeof options.slowmo === 'number') ? options.slowmo : 0;
        this.agent = (typeof options.agent === 'string') ? options.agent : 'FetchBot-1.5.6';
        this.debug = options.debug === true;
    }

    public getAll(): OptionsInterface {
        return {
            attached: this.attached,
            trust: this.trust,
            width: this.width,
            height: this.height,
            wait: this.wait,
            slowmo: this.slowmo,
            agent: this.agent,
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

    public getUserAgent(): string {
        return this.agent;
    }

    public isAttached(): boolean {
        return this.getAll().attached;
    }

    public ignoreHttpErrors(): boolean {
        return this.getAll().trust;
    }
}
