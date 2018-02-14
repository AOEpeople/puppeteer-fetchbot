import {readFileSync} from "fs";
import {Options} from "./lib/classes/options";
import {Bot} from "./lib/classes/bot";

console.log('🤖  Start a journey that my tour guide has planned for me  => "../examples/aoe.people.and.languages.json"\n');

let tour = JSON.parse(readFileSync(__dirname + '/../examples/aoe.people.and.languages.json', 'utf-8'));

let bot = new Bot(tour, new Options({
    debug: false, headless: false
}));

bot
    .run()
    .then((result) => {
        
        // Now the browser instance was closed and
        // the data grabbed during APPNAMEing gets available
        console.log(JSON.stringify(result, null, '\t'));
    });