[![Build Status](https://travis-ci.org/AOEpeople/puppeteer-fetchbot.svg?branch=master)](https://travis-ci.org/AOEpeople/puppeteer-fetchbot)
[![codecov](https://codecov.io/gh/AOEpeople/puppeteer-fetchbot/branch/master/graph/badge.svg)](https://codecov.io/gh/AOEpeople/puppeteer-fetchbot)
[![Dependency Status](https://gemnasium.com/badges/github.com/AOEpeople/puppeteer-fetchbot.svg)](https://gemnasium.com/github.com/AOEpeople/puppeteer-fetchbot)

# FetchBot 1.4.1

<img src="https://i.imgur.com/ntm3aNU.png" alt="FetchBot" width="200" align="center"/>

## About
FetchBot is a library and shell command that provides a simple JSON-API to perform human like interactions and 
data extractions on any website and was built on top of [puppeteer](https://github.com/GoogleChrome/puppeteer).

**Using FetchBot you can do both:**
 - automise website interactions like a human
 - treat website(s) like an API and use fetched data in your own application.
 
FetchBot also has an "event listener like" system that turns your browser into a
bot who knows what to do when the url changes. 
From now on it's up to you to configure a friendly bot or a crazy zombie.

## For upgrades from 1.3.x or older versions
The .run() method is deprecated from now on and removed in 1.5.x versions.

**Two new Methods have been introduced:**
- `runAndExit(pathToJobFile or job object)`
- `runAndStandby(pathToJobFile or job object)`

To make both methods working in 1.4.x, replace the first param (pathToJobFile or job object) when constructing an by an 
empty string (see examples below) and pass the prior path or object to one of the newly introduced methods.

Using `runAndExit` the behavior stays the same as today (Fetchbot quits after completion). 
Using the new method `runAndStandby` the Chromium process is not killed so that there is a huge performance increase 
(29sec less time consumption in the unit tests **before 1.4.x**:43s / **since 1.4.x**14s) when many jobs should been processed (Because the browser does not need to be re-restarted).

Using `runAndStandby` method make it necessary to exit the browser once operations are done by executing

````javascript
const myFetchBotInstance = new FetchBot('',{attached:true});

await myFetchBotInstance.runAndStandby('/path/to/job1.json');
await myFetchBotInstance.runAndStandby('/path/to/job2.json');

await myFetchBotInstance.exit();
````

## Installation

**FetchBot is not running on ARM architectures**

### Short installation (works well on a mac) 

You can install via npm in your project using:
```bash
npm install --save fetchbot
```
```bash
yarn add fetchbot
```

### Safe installation (For installs on Debian/Ubuntu or other linux systems)
Ensure dependencies below are installed on Debian/Ubuntu systems

````bash
apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget    
````

For other operating systems have a look in the 
[troubleshooting section](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md) for puppeteer 
related problems.


**For other problems leave an issue here.**

### Use as library in your own project

To get the most out of FetchBot it can be also integrated into a software project as a 3rd party library.
From here on there are unlimited possibilities and a list of nice use cases will follow soon.
````bash
$ cd /my/existing/project/
$ npm install fetchbot

$ cd /my/existing/project/
$ yarn add fetchbot 
````    
### Use as global command

**NOTICE:** 
**Do not install globally via yarn because linking is not working there**
````bash
$ sudo npm install -g fetchbot --unsafe-perm=true

# --unsafe-perm=true is required yet due to global install issues in puppeteer
# https://github.com/GoogleChrome/puppeteer/issues/375#issuecomment-363466257
````    
    
### Options
Many options can be applied directly via passed configuration object to control browser and page behavior. 
All these options can be passed via command line too.  An entire list of all command line options can be obtained via:
 
> To get a complete list whats possible via commandline just type
````bash 
 $ fetchbot --help
````  
or in a local installation
````bash
$ ./node_modules/.bin/fetchbot --help
````

#### Options params
````text
attached: boolean | default=false           Specifies if the browser window is shown or not
trust: boolean    | default=false           Open unsecure https pages without a warning 
width: number     | defautlt=800            Browser and view port width
height: number    | default=600             Browser and view port height
wait: number      | default=750             Delay after each command before execution continues
slowmo:number     | default=0               Slowes down the execution in milliseconds
agent:string      | default=Fetchbot-1.4.1  User agent string
debug: boolean    | default=false           Determine if debug/logging messages are shown
 ````  

         
#### Pass options via command line 
> Command line input example
````bash
$ fetchbot --job=./path/to/job/file.json --slowmo=250 --output=a-json-file.json --attached --debug
````   

#### Pass options as configuration object in the library
````javascript
const FetchBot = require('fetchbot');

// Pass a path to a job configuration file
(async () => {
 const fetchbot = new FetchBot('', {attached: false});
 fetchBotData = await fetchbot.runAndExit('./path/to/job/file.json');  
 
 console.log(fetchBotData);
})();

// Or by passing a configuration opject directly
(async() = > {
    const fetchbot = new FetchBot('', {
        "attached": true,
        "slowmo": 250,
        "width": 1280,
        "height": 1024,
        "trust": true
    });

fetchBotData = await fetchbot.runAndExit({
    "https://google.com": {
        "root": true,
        "type": [
            [
                "input",
                "puppeteer-fetchbot aoepeople"
            ],
            [
                "input",
                "\n"
            ]
        ]
    },
    "/search": {
        "fetch": {
            "h3.r > a AS headlines": [],
            "h3.r > a AS links": {
                "attr": "href",
                "type": []
            }
        },
        "waitFor": [
            [
                1000
            ]
        ]
    }
});
console.log(fetchBotData);
})();
````  

## Job configuration
A job configuration is a JSON object which has on the highest level URI's as keys.
> Example the configurations highest level

````json
{
    "https://github.com/aoepeople": {"root":true}
}
```` 

````json
{
    "https://github.com/aoepeople": {"root":true},
    "https://github.com/aoepeople/home.html": [{}, {}],
    "https://www.aoe.com/en/solutions.html": {"root":true}
}
```` 

- **Root** Objects
- **Stopover** Objects (can be wrapped in arrays)

### Root objects

The root level url forces FetchBot to to open the page url immediately. It's allowed to have multiple root 
objects inside a single configuration. Once all root configuration urls have been visited the FetchBot job is finished and
fetched data is returned (see **Data Fetching**).

>Example
````json
{
  "https://www.aoe.com/en/": {
    "root":true,
    "click":"nav.main-menu.ng-scope > ul > li:nth-child(2) > a"
  }
}
```` 
     
### Stopover objects

Stopover objects do **not** have the root property. These objects behave different and can be understood a bit like
event listeners. Once the browser changes the url and the opened url matches a stopover url ist's configuration gets 
applied (e.g. by a form submission on a root page or a clicked link). Once a configuration has been applied to an open
page the object gets immediately removed from FetchBot job list.
 
> Syntax

````json
{

    // set of commands but each command only once
    "https://www.aoe.com/en/solutions.html": {
        "click":"nav.main-menu.ng-scope > ul > li:nth-child(2) > a"
    },

    // Or as an array (set of command groups)
    "https://www.aoe.com/en/products.html": [
        {
            "click":"[data-qa=\"header-navigation-search-icon\"]"
        },
        {
            "type":[["#city-input-field", "Open Source"]],
            "click":"#search"           
        }
    ]
}
```` 



### Command types for interaction

There are three ways yet how page-commands can be called.

- Without a parameter (No argument action)
- With a single argument (Single argument action)
- With mutiple arguments (Multiple arguments action)

**Note:** Any single argument action can also been called using the multiple argument action

#### No argument action

> Syntax
````json
{
    "reload":null  // page.reload()
}
```` 
#### Single argument action
> Syntax
````json
{
    "click":"#myButton"  // page.click("#myButton")
}
```` 
#### Multiple arguments action
> Syntax
````json
{
    "type":[
            ["#myInput", "Hello World"]  // page.type("#myInput", "Hello World")
    ]  
}
```` 
     
### Data Fetching aka. "Crawling"

For data fetching there is a `fetch` API that simplifies puppeteers evaluation interface.
The `fetch` API provides declarative support to four different data types:

- `Boolean`
- `Number`
- `String`
- `Array of String(s)` 
- `Array of Numbers(s)`
- `Objects containing an additional attribute matching `

And of course it's possible to map meaningful property names to selectors using the `AS` or `as`
keyword.

Fetching the `textContent` attribute is the default behavior but it's possible as well to access any other
attribute. Then write instead of the defined data type an object containing a configuration of `type` and `attr`.
`type` is the data type as previously explained and `attr` is the attribute to fetch.

> Fetch syntax
````json
{
    "fetch": {
        "#myFirstSelector AS exists": false,           
        "#mySecondSelector AS amount": 0,               
        "#myThirdSelector AS description": "",          
        "#myFouthSelector AS pressReleases": [],      
        "#myFifthSelector AS likes": null,             
        "#linkTargetResolved as attributeIsWorking": {
              "attr": "align",
              "type": ""
            },
            "#linkTargetResolved as attributeAlignExists": {
              "attr": "align",
              "type": false
            },
            "#linkTargetResolved as dataTestIsWorking": {
              "attr": "data-test",
              "type": ""
            },
            "h2.xyz as collectedIds": {
              "attr": "id",
              "type": null
            },
            "h2.xyz as collectedClassNames": {
              "attr": "class",
              "type": []
            }
    }
}
````  
**The configuration above results in an object like in the example below**
    
> Result
````json
{
	"exists": true,
	"amount": 123,
	"description": "Some fetched text content",
	"pressReleases": [
		"Foo",
		"Bar",
		"Baz"
	],
	"likes": [
		132,
		2,
		87
	],
	"links": [
		"http://www.foo.bar",
		"http://www.bar.foo",
		"http://www.baz.bar"
	],
	"attributeIsWorking": "yes",
	"attributeAlignExists": true,
	"dataTestIsWorking": "working",
	"collectedIds": [
		123,
		456
	],
	"collectedClassNames": [
		"xyz",
		"xyz"
	]
} 
````  
### And now it's time to start interaction with a website

Feel free to copy this example below, save to a file e.g. googlesearch.json and execute using the cli tool.

```bash
./node_modules/.bin/fetchbot --job=googlesearch.json --debug --slowmo
````

> Example job
```json
{
  "https://google.com": {
    "root": true,
    "type": [
      [
        "input",
        "puppeteer-fetchbot aoepeople"
      ],
      [
        "input",
        "\n"
      ]
    ]
  },
  "/search": {
    "fetch": {
      "h3.r > a AS headlines": [],
      "h3.r > a AS links": {
        "attr": "href",
        "type": []
      }
    },
    "waitFor": [
      [
        1000
      ]
    ]
  }
}
````
> Results in
`````json
{
  "headlines": [
    "GitHub - AOEpeople/puppeteer-fetchbot: Library and Shell command ...",
    "AOE · GitHub",
    "fetchbot - npm"
  ],
  "links": [
    "https://github.com/AOEpeople/puppeteer-fetchbot",
    "https://github.com/AOEpeople",
    "https://www.npmjs.com/package/fetchbot"
  ]
}
`````

A complete list whats possible on a page is yet only available in the puppeteer documentation at 
[Page API Chapter](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page).
       
## Examples
### Boilerplate (plain JS)
````javascript
var FetchBot = require('fetchbot'),

    // Create an FetchBot instance whre entire config is passed in
    myFetchBot = new FetchBot({"https://google.com": {root: true, waitFor: [[10000]]}}, {attached: true, debug:true});

    // Or alternatively create an instance which tells FetchBot to load a JSON file as config
    myFetchBot = new FetchBot('', {attached: true, debug:true});

    myFetchBot
        .runAndExit('googlesearch.json')
        .then(function (result) {
            console.log(result);
            // {
            //     "headlines": [
            //     "GitHub - AOEpeople/puppeteer-fetchbot: Library and Shell command ...",
            //     "AOE · GitHub",
            //     "fetchbot - npm"
            // ],
            //     "links": [
            //     "https://github.com/AOEpeople/puppeteer-fetchbot",
            //     "https://github.com/AOEpeople",
            //     "https://www.npmjs.com/package/fetchbot"
            // ]
            // }
        });       
````

### Conclusion
FetchBot has been introduced to speed up the development process as a frontend engineer by stepping automatically over
pages which are not part of the current user story. But during development more and more use cases were found and it
made a lot of fun building "batch like" JSON files that turned the browser into a bot. FetchBot was written in [TypeScript](https://www.typescriptlang.org/) and is transpiled in build run. 
It's normally automatically built during installation. 

Now it's time to thank all the people who had an open ear and a different perspective than myself and yeah all in all
made FetchBot much better. 




