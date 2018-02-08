# Appname


![How it works]()

## About


## Config File
### Grab urls from a google search result

**Create a json file using the following content (examples/search-google.json):**
    
    {
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
    }
    
**Then call the APPNAME command:**

>   *yarn run --config=search-google.json*

>   *npm run --config=search-google.json*
    
**Output:**

    {
    	"links": [
    		"https://github.com/aoepeople",
    		"https://github.com/AOEpeople/Magento_Boilerplate",
    		"https://github.com/AOEpeople/Aoe_Scheduler",
    		"https://twitter.com/aoepeople",
    		"https://vimeo.com/aoepeople",
    		"https://vimeo.com/aoepeople/videos",
    		"https://www.aoe.com/en/blog/people/daniel-poetzinger.html",
    		"https://www.facebook.com › Places › Wiesbaden, Germany",
    		"https://www.youtube.com/user/aoepeople"
    	]
    }

### Commandline params

      -h, --help Boolean       Show the help page
      -c, --config file        Specify the input config file (required)
      -s, --headless Boolean   specifies if Chrome should run in headless mode (optional | default=true)
      -t, --target String      specifies the folder where output is stored (optional | default=none)
      -w, --wait Number        Time to wait (in ms) before browser is closed after completion  (optional |
                               default=0)

## ADVANCED
- Visualization how the config works
- Beside a configuration that makes both arrays on site, commands on site, arayed commands understandable
First I want to click somewhere then an input appears and I want to write into an that then some checkbox appears which must be checked


# FUTURE PLANS

- Trust insecure https allowInsecure (optional default= true)
- Prepend base domain use-base-href (write a domain inside to use config on multipe instances)
- Slow mode (slow running process)
- Retry (optional default = 0)
- Client Header modification
- Templating (e.g. to avoid readabel passwords in a config file)
- Plugin/Extension System
  - Randomizer (Numbe, from File by line)




# Conclusion

## Contributions

### Ideas

### Pull requests


