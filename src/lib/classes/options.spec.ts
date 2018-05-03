import {expect} from 'chai';
import {Options} from "./options";
import {type} from "os";


describe('Options', () => {

    let options = new Options({});

    it('Should create an options instance with only mandatory properties', () => {
        expect(typeof options).to.equal('object');
    });

    it('Should provide the options object with all defaults set', () => {

        let DEFAULT_OPTIONS = options.getAll(),
            EXPECTED_OPTIONS = {
                agent: 'FetchBot-1.4.10',
                attached: false,
                trust: false,
                width: 1024,
                height: 768,
                wait: 750,
                slowmo: 0,
                debug: false
            };

        expect(DEFAULT_OPTIONS).to.deep.equal(EXPECTED_OPTIONS);

        expect(typeof DEFAULT_OPTIONS.attached).to.equal('boolean');
        expect(typeof DEFAULT_OPTIONS.trust).to.equal('boolean');
        expect(typeof DEFAULT_OPTIONS.width).to.equal('number');
        expect(typeof DEFAULT_OPTIONS.height).to.equal('number');
        expect(typeof DEFAULT_OPTIONS.wait).to.equal('number');
        expect(typeof DEFAULT_OPTIONS.slowmo).to.equal('number');

    });

    it('Should provide default browser&page dimensions (width/height)', () => {
        expect(typeof options.getWidth()).to.equal('number');
        expect(typeof options.getHeight()).to.equal('number');

        expect(options.getDimensions()).to.deep.equal({
            width: options.getWidth(),
            height: options.getHeight()
        });
    });

    it('Should get the current run mode default', () => {
        expect(options.isAttached()).to.equal(false);
    });

    it('Should get the current ignoreHttpErrors default', () => {
        expect(options.ignoreHttpErrors()).to.equal(false);
    });

    it('Should apply custom settings for width and height', () => {
        options = new Options({
            width: 1,
            height: 2
        });

        expect(options.getDimensions()).to.deep.equal({width: 1, height: 2});
    });
});