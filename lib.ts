import {Options} from "./lib/classes/options";
import {Bot} from "./lib/classes/bot";

console.log('lib usecase');

let config = {
    "https://www.google.com/ncr": {
        "root": true,
        //"maxCalls": 10,
        "type": [
            [
                "#lst-ib",
                "AOE people"
            ],
            [
                "#lst-ib",
                "\r" //String.fromCharCode(13) //TODO support COMMANDS LIKE ENTER_KEY
            ]
        ]
    },
    "https://www.google.com/search": {
        //   "maxCalls": 10,
        "fetch": {
            "cite as links": ''
        },
        "click": "#rso > div > div > div:nth-child(1) > div > div > h3 > a"
    },

    "https://github.com/AOEpeople": {
        //   "maxCalls": 10,
        "fetch": {
            "a.no-wrap.text-gray.d-inline-block.muted-link AS sharedKnowledgeLanguages": []
        },
        "click": "#js-pjax-container > div > header > div > nav > a:nth-child(2)"
    },

    "https://github.com/orgs/AOEpeople/people": {
        //   "maxCalls": 10,
        "fetch": {
            ".member-info AS mitarbeiter": []
        }
    }
};


let options = new Options({
    config: config,
//    debug: true
});


let bot = new Bot(options);

bot
    .run()
    .then((result) => {
        console.log(JSON.stringify(result, null, '\t'));
    });

