# Appname


![How it works]()
Demo

## About
APPNAME is a shell command & library to perform human like interactions and data "grabbing" on any website.

### Interactions

### Write configurations
A configuration is a simple JSON object which has on the highest level URI's as keys.
> Example the configurations highest level

    {
        "https://github.com/aoepeople": {} | [{},{}]
    }

Each key accept two types of value Object and Array.
The Array accepts multiple APPNAME objects which are explained here.

#### Root objects

The root level url forces the APPNAME-runner to open the page in a new browser tab. It's allowed to have multiple root 
objects inside a configuration. Once all root configuration urls have been visited the APPNAMEtour is finished and
grabbed data is returned (see grabbing).

>Example

     {
        "https://github.com/aoepeople": {
            "root":true
        }
     }
     
#### Stopover objects

Stopover objects do **not** have the root property. These objects behave different and can be understood a bit like
event listeners. Once the browser changes the url and the opened url matches a stopover url ist's configuration gets 
applied (e.g. by a form submission on a root page or a clicked link). When configuration has been applied to open page 
the objects gets removed from APPNAMElist.
 
> Syntax

    {
        "https://github.com/orgs/AOEpeople/people": {
            
        }
    } 

#### Command types for interaction

##### No argument action

> Syntax

    {
        "reload":null  // page.reload()
    }

##### Single argument action
> Syntax

    {
        "click":"#myButton"  // page.click("#myButton")
    }

##### Multiple arguments action
> Syntax

    {
        "type":[
                ["#myInput", "Hello World"]  // page.type("#myInput", "Hello World")
        ]  
    }
    
##### And now... interact
> Syntax

    {
        "https://github.com/aoepeople": {
           
            "root":true,
            
            "type": [
              [
                "input[type='text']",
                "Hi I`m APPNAME."
              ],
              
              [
                "input[type='text']",
                "..and I interact with this website"
              ]
            ],
            
            "waitFor": [
              [
                10000
              ]
            ],
            
            "click":"#js-pjax-container > div > header > div > nav > a:nth-child(2)"
        }
    }

A complete list whats possible on a page is yet only available in the puppeteer documentation at 
[Page API Chapter](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page).


    

###### Examples: 

> Write into text input

    {"type":[["input#username", "foo"]]}
    
> Write into multiple text inputs and press return key to submit form
    
    {
        "type":[
            ["input#username", "foo"],
            ["input#password", "password"],
            ["input#username", "\n"],
        ]
    }
    
    
#### Data grabbing (crawling)

For data grabbing there is a ``fetch`` command which simplifies puppeteers evaluation api.
The fetch api provides declarative support for four different data types which can be grabbed from a page:

- `Boolean`
- `Number`
- `String`
- `Array of String(s)` 
- `Array of Numbers(s)`

Furthermore it's possible to map meaningful property names to selectors having required data using the `AS` or `as`
keyword.

> Syntax

    {
        fetch:{
            
            {
                "#mySelector AS exists": false      // selector match becomes (true) 
            },
            {
                "#mySelector AS amount": 0          // selector match textContent is parsed as Number
            },
            {
                "#mySelector AS description": ""    // selector match textContent is stored
            },
            {
                "#mySelector AS pressReleases": []  // selector matches textContents are stored
            },
            {
                "#mySelector AS likes": null        // selector matches textContents are parsed to number 
            }
        }
    }
        
### Command line ready
APPNAME can be used as a command line tool. There are 

    npm install -g APPNAME or yarn global APPNAME

   
### Use as library in your own project

     > cd /my/existing/project/
     > npm install APPNAME or yarn APPNAME
 
> Example

    import {readFileSync} from "fs";
    import {Options} from "./lib/classes/options";
    import {Bot} from "./lib/classes/bot";
    
    let tour = JSON.parse('PATH/TO/APPNAME_CONFIGURATION.json', 'utf-8'));
    
    let bot = new Bot(tour, new Options({
        debug: false,
        headless: false
    }));
    
    bot
        .run()
        .then((result) => {
            // Now the browser instance was closed and 
            // the data grabbed during APPNAMEing gets available
            console.log(JSON.stringify(result, null, '\t'));
        });
    
    
### Options
Following options can be applied directly via passed configuration object or as params in via command line.

#### Options object
    
        headless: boolean | default=false   Specifies if the browser window is shown or not
        wait: number      | default=0       Delay time between each page interaction
        trust: boolean    | default=false   Open unsecure https pages without a warning 
        width: number     | defautlt=800    The Browser and viewport width
        height: number    | default=600     The Browser and Viewport height
        slowMotion:number | default=0       Slowes down the processing in milliseconds
        debug: boolean    | default=false   Determine if debug/logging messages are shown 
        

#### Pass options Object
> Options object

    var Options = require('APPNAME').Options,
        
        options = new Options({
            headless: false,
            debug: true
        });
    
#### Pass options via command line 

An entire list of all command line options (some more than in the options object) can be optained via

    > APPNAME --help

   
> Command line input

    APPNAME --trust --debug --slowMotion=250 --width=1024 --height=768 o ./my-grabbed-data.json
    
### Conclusion

APPNAME is written in TypeScript and transpiled via npm/yarn run build. it's normally automatically built during
installation.

#### FUTURE PLANS (unpriorized)
- Trust insecure https allowInsecure (optional default= true)
- Prepend base domain use-base-href (write a domain inside to use config on multipe instances)
- Slow mode (slow running process)
- Retry (optional default = 0)
- Client Header modification
- Templating (e.g. to avoid readabel passwords in a config file)
- Plugin/Extension System
  - Randomizer (Numbe, from File by line)
  
  
### Contributions...
...are of course always welcome;


