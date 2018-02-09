import {Options} from "./lib/classes/options";
import {Bot} from "./lib/classes/bot";

console.log('lib usecase');

let config = {
    "https://www.google.com/ncr": {
        "root": true,
        "type": [
            [
                "#lst-ib",
                "aoe people"
            ]
        ],
        "click": "#tsf > div.tsf-p > div.jsb > center > input[type=\"submit\"]:nth-child(1)"
    },
    "https://www.google.com/search": {
        "fetch": {
            "cite as links": []
        }
    }
};


let options = new Options({
    config: config,
    debug: true
});


let bot = new Bot(options);

bot
    .run()
    .then((result) => {
        console.log(result);
    });

