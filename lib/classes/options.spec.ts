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
                headless: false,
                wait: 0,
                trust: false,
                width: 800,
                height: 600,
                slowMotion: 250,
                debug: false
            };

        expect(Object.keys(DEFAULT_OPTIONS).sort()).to.deep.equal(Object.keys(EXPECTED_OPTIONS).sort());

        expect(typeof DEFAULT_OPTIONS.headless).to.equal('boolean');
        expect(typeof DEFAULT_OPTIONS.wait).to.equal('number');
        expect(typeof DEFAULT_OPTIONS.trust).to.equal('boolean');
        expect(typeof DEFAULT_OPTIONS.width).to.equal('number');
        expect(typeof DEFAULT_OPTIONS.height).to.equal('number');
        expect(typeof DEFAULT_OPTIONS.slowMotion).to.equal('number');

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
        expect(options.getRunMode()).to.equal(false);
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