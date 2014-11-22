# Video Client & Analytics Server #
  
  Simple video player client (based on JWPlayer) with a configurable analytics server in node.js

## Pre Install ##
  install Apache CouchDB
   
## Install ##

    npm install vanalytics

## Configuration ##

  Check [config file](config.js) 


## Upload Views to CouchDB ##

    ./pushapp
    

## Run ##
from the installation directory run
    
    ./node_modules/.bin/vanalytics start
    
    
You can also create an init script:
    
    ln -s ./node_modules/.bin/vanalytics /etc/init.d/vanalytics
    
    
### ip location services ###

  https://github.com/rs/node-netmask
  
  http://www.telize.com/geoip?callback=?%22
  
  http://freegeoip.net/
  
  http://services.ce3c.be/ciprg/?countrys=IRAN+%28ISLAMIC+REPUBLIC+OF%29%2C&format=shareaza&format2=Country+%3A%3A+%7Bcountry%7D%0D%0AStart+IP+of+range+%3A%3A+%7Bstartip%7D%0D%0AEnd+IP+of+range+%3A%3A+%7Bendip%7D%0D%0ANetmask+%3A%3A+%7Bnetmask%7D%0D%0A
