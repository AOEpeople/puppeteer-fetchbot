import {readFileSync} from "fs";
import {Options} from "./lib/classes/options";
import {FetchBot} from "./lib/classes/fetch-bot";

console.log('🤖  Start a journey that my tour guide has planned for me  => "../examples/aoe.people.and.languages.json"\n');

let tour = JSON.parse(readFileSync(__dirname + '/../examples/aoe.people.and.languages.json', 'utf-8'));

let bot = new FetchBot(tour, new Options({}));

bot
    .run()
    .then((result) => {
        
        // Now the browser instance was closed and
        //the data grabbed during fetchbot's working process gets available
        console.log(JSON.stringify(result, null, '\t'));
    });