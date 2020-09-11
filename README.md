[![Build status — Travis-CI][travis-icon]][travis]
[![Code coverage — Code-Cov][codecov-icon]][codecov]
[![cookie-notice on Npmjs][npm-icon]][npm]
[![Total downloads ~ Npmjs][downl-icon]][npm]

# FetchBot 1.9.0

<img src="https://i.imgur.com/ntm3aNU.png" alt="FetchBot" width="200" align="center"/>

## About
FetchBot is a library and shell command that provides a simple JSON-API to perform human like interactions and 
data extractions on any website and was built on top of [puppeteer](https://github.com/GoogleChrome/puppeteer).

**Simple working principle:**
<img src="https://i.imgur.com/iRR1K6Y.jpg" alt="Fetchbot working principle" align="center"/>

**Extended data fetch working principle:**
<img src="https://i.imgur.com/4RMv215.jpg" alt="Fetchbot working principle" align="center"/>

**Fetchbot introduction video (German)**
[![Fetchbot introduction in german](https://img.youtube.com/vi/t71saoi4slQ/0.jpg)](https://www.youtube.com/watch?v=t71saoi4slQ)


**Using FetchBot you can do both:**
- automate website interactions like a human
- treat website(s) like an API and use fetched data in your project.

FetchBot has an "event listener like" system that turns your browser into a bot who knows what to do when the url 
changes. The "event" is an url/regex and it's configuration is executed, once the url/pattern matches the currently
opened one. Now on it's up to you to configure a friendly bot or a crazy zombie.

````javascript
const myFetchBotInstance = new FetchBot({attached:true});

let resultForJob1 = await myFetchBotInstance.runAndStandby('/path/to/job1.json');
let resultForJob2 =  await myFetchBotInstance.runAndStandby('/path/to/job2.json');

await myFetchBotInstance.exit();

// Now do something with the results 
console.log(resultForJob1);
console.log(resultForJob2);
````

## Installation

**NOTICE: FetchBot is not running on ARM architectures yet**

### Short installation (works well on a mac) 

You can install via npm in your project using:
```bash
npm install --save fetchbot
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
````    
### Use as global command

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
agent:string      | default=Fetchbot-1.9.0 User agent string
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

(async () => {
    
    // Pass a path to a job configuration file
    const fetchbot = new FetchBot({attached: false});
    fetchBotData = await fetchbot.runAndExit('./path/to/job/file.json');  
    
    console.log(fetchBotData);


    // Or by passing a configuration opject directly
    const fetchbot = new FetchBot({
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

    "https://www.aoe.com/en/solutions.html": {
        "click":"nav.main-menu.ng-scope > ul > li:nth-child(2) > a"
    },

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

> Syntax for e.g. page.reload()
````json
{
    "reload":null  
}
```` 
#### Single argument action
> Syntax for e.g. page.click("#myButton")
````json
{
    "click":"#myButton"
}
```` 
#### Multiple arguments action
> Syntax for e.g. page.type("#myInput", "Hello World")
````json
{
    "type":[
            ["#myInput", "Hello World"]
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

**Fetch syntax**
<img src="https://i.imgur.com/B0JNVQR.png" alt="Fetchbot Fetch command principle" align="center">

**The configuration above results in an object like in the example below**
<img src="https://i.imgur.com/TmmbpVZ.png" alt="Fetchbot Fetch command result" align="center">
  
  
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
> Results in something like this
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

    // Or alternatively create an instance which tells FetchBot to load a JSON file as config
    myFetchBot = new FetchBot({attached: true, debug:true});

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


[travis-icon]: https://travis-ci.org/AOEpeople/puppeteer-fetchbot.svg?branch=master
[travis]: https://travis-ci.org/AOEpeople/puppeteer-fetchbot "Build status – Travis-CI"

[codecov]: https://codecov.io/gh/AOEpeople/puppeteer-fetchbot "Code Coverage – Codecov"
[codecov-icon]: https://codecov.io/gh/AOEpeople/puppeteer-fetchbot/branch/master/graph/badge.svg "Code Coverage – Codecov"

[npm]: https://npmjs.com/package/fetchbot "FetchBot – on NPM"
[npm-icon]: https://img.shields.io/npm/v/fetchbot.svg
[license-icon]: https://img.shields.io/npm/l/fetchbot.svg
[downl-icon]: https://img.shields.io/npm/dt/fetchbot.svg "Count of total downloads – NPM"
[build]: https://github.com/AOEpeople/puppeteer-fetchbot/tree/master/dist





