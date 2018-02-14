# Appname

<img src="https://i.imgur.com/PnxAzGH.png" alt="APPNAME" width="200" align="center"/>

## About
APPNAME is a library and shell command that provides a simple JSON-API to perform human like interactions and 
data extractions on any website and was built on top of [puppeteer](https://github.com/GoogleChrome/puppeteer).

**Using APPNAME you can do both:**
 - Automize website interactions like a human
 - Treat website(s) like an API and use fetched data in your own application.
 
APPNAME also has an "event listener like" system that turns your browser into a
bot who knows what to do when the url changes. 
From now on it's up to you to configure a friendly bot or a crazy zombie.

### JSON configurations
A configuration is a simple JSON object which has on the highest level URI's as keys.
> Example the configurations highest level

    {
        "https://github.com/aoepeople": {} | [{},{}]
    }

Each key accept two types of values `object` and `array`.
The Array accepts multiple APPNAME objects (**root** and **stopover** objects).

#### Root objects

The root level url forces the APPNAME-runner to open the page in a new browser tab. It's allowed to have multiple root 
objects inside a single configuration. Once all root configuration urls have been visited the APPNAMEtour is finished and
fetched data is returned (see **Data Fetching**).

>Example

     {
        "https://github.com/aoepeople": {
            "root":true
        }
     }
     
#### Stopover objects

Stopover objects do **not** have the root property. These objects behave different and can be understood a bit like
event listeners. Once the browser changes the url and the opened url matches a stopover url ist's configuration gets 
applied (e.g. by a form submission on a root page or a clicked link). Once a configuration has been applied to an open
page the object gets immediately removed from APPNAMElist.
 
> Syntax

    {
        "https://github.com/orgs/AOEpeople/people": {
            
        }
    } 

#### Command types for interaction

There are three ways yet how a page-commands can be called.

- Without a parameter (No argument action)
- With a single argument (Single argument action)
- With mutiple arguments (Multiple arguments action)

**Note:** Any single argument action can also been called using the multiple argument action

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
    
    
#### And now it's time to start interaction with a website
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
            
            fetch:{            
              {
                "#mySelector AS count": 0
              }
            },
            
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
    
> Write into multiple inputs and press return key to submit form
    
    {
        "type":[
            ["input#username", "foo"],
            ["input#password", "password"],
            ["input#password", "\n"],       // Means to press enter/return key and submit the form
        ]
    }
    
#### Data Fetching aka. "Crawling"

For data fetching there is a `fetch` API that simplifies puppeteers evaluation interface.
The `fetch` API provides declarative support to four different data types:

- `Boolean`
- `Number`
- `String`
- `Array of String(s)` 
- `Array of Numbers(s)`

And of course it's possible to map meaningful property names to selectors using the `AS` or `as`
keyword.

> Fetch syntax

    {
        fetch:{
            
            {
                "#myFirstSelector AS exists": false      // selector match becomes (true) 
            },
            {
                "#mySecondSelector AS amount": 0         // selector match textContent is parsed as Number
            },
            {
                "#myThirdSelector AS description": ""    // selector match textContent is stored
            },
            {
                "#myFouthSelector AS pressReleases": []  // selector matches textContents are stored
            },
            {
                "#myFifthSelector AS likes": null        // selector matches textContents are parsed to number 
            }
        }
    }
    
**The configuration above results in an object like in the example below**
    
> Result

    {
        "exists":true,
        "amount":123,
        "description":"Some fetched text content",
        "pressReleases":[
            "Foo",
            "Bar",
            "Baz",
        ],
        "likes":[
            132,
            2,
            87,
        ]
    }    
        
### Command line usage
APPNAME can be installed as a command line tool.

    $ npm install -g APPNAME or yarn global add APPNAME
   
### Use as library in your own project

To get the most out of APPNAME it can be also integrated into a software project as a 3rd party library.
From here on there are unlimited possibilities and a list of nice use cases wil follow soon.


     $ cd /my/existing/project/
     $ npm install APPNAME or yarn add APPNAME
 
> Boilerplate (plain JS)

    var APPNAME = require('APPNAME'),
    
        // Create an APPNAME instance whre entire config is passed in
        appname = new APPNAME({"https://google.com": {root: true, waitFor: [[10000]]}}, {headles: false});
    
        // Or alternatively create an instance which tells APPNAME to load a JSON file as config
        appname = new APPNAME('./path/to/my/config.json', {headles: false});
    
        appname
            .run()
            .then(function (result) {
                console.log('Completed');
            });
        
### Options
Many options can be applied directly via passed configuration object to control browser and page behavior.
All these options can be passed via command line too. 

> To get a complete list whats possible via commandline just type

    $ APPNAME --help

#### Options object
    
        headless: boolean | default=false   Specifies if the browser window is shown or not
        trust: boolean    | default=false   Open unsecure https pages without a warning 
        width: number     | defautlt=800    The Browser and viewport width
        height: number    | default=600     The Browser and Viewport height
        slowmo:number     | default=0       Slowes down the execution in milliseconds
        debug: boolean    | default=false   Determine if debug/logging messages are shown 
        
#### Pass options via command line 

An entire list of all command line options (some more than in the options object) can be optained via

    $ APPNAME --help
   
> Command line input

    $ APPNAME --job=./examples/aoe.people.and.languages.json --slowmo=25
    
### Conclusion

APPNAME has been introduced to speed up the development process as a frontend engineer by stepping automatically over
pages which are not part of the current user story. But during development more and more use cases were found and it
made a lot of fun building "batch like" JSON files that turned the browser into a bot. APPNAME was written in [TypeScript](https://www.typescriptlang.org/) and is transpiled via npm/yarn run build. 
It's normally automatically built during installation. 

Now it's time to thank all the people who had an open ear and a different perspective then myself and yeah all in all made APPNAME
much better. 




