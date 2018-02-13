# Appname


![How it works]()

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

Stopover objects do **not** have the root attribute. These objects behave different and can be understood a bit like
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
- Boolean
- Number
- String
- Array of String(s) 
- Array of Numbers(s) 

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
When APPNAME should be used as command line tool only a global installation is recommended

    npm install -g APPNAME or yarn global APPNAME

   
### Use as library in your own project

     npm install APPNAME or yarn APPNAME
     
     var AppName = require('APPNAME');
     
     let app = new AppName(APPNAMEJOBLIST, OPTIONS)
     
     app
         .run()
         .then((result) => {
             console.log(JSON.stringify(result, null, '\t'));
         });

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


