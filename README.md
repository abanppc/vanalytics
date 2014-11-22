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
    

### Sample reports ###

 * Views Histogram by (UUID,UserId)

    `GET /analytics/views/25ea3fae-4220-11e4-86da-2c44fd7f1164/user2`


    ```json
    {
      "ok": true,
      "results": [{
        "key": ["25ea3fae-4220-11e4-86da-2c44fd7f1164", "user2"],
        "value": {
          "1": 1,
          "2": 1,
          "3": 1,
          "4": 1,
          "5": 1,
          "27": 1,
          "28": 1,
          "29": 1,
          "30": 1,
          "31": 1,
          "32": 1,
          "33": 1,
          "34": 1,
          "35": 1,
          "36": 1,
          "37": 1,
          "38": 1,
          "39": 1,
          "40": 1
        }
      }]
    }
    ```


 * Total Watches by UUID

    `GET /analytics/watches/25ea3fae-4220-11e4-86da-2c44fd7f1164`

    ```json
    {
      "ok": true,
      "results": [{
        "key": ["25ea3fae-4220-11e4-86da-2c44fd7f1164", 2014, 11, 22],
        "value": 1
      }]
    }
    ```


 * Total Watches by (UUID/UserId)

    `GET /analytics/watches/25ea3fae-4220-11e4-86da-2c44fd7f1164/user2`

    ```json
    {
      "ok": true,
      "results": [{
        "key": ["25ea3fae-4220-11e4-86da-2c44fd7f1164", "user2", 2014, 11],
        "value": 1
      }]
    }
    ```


 * Play/Replay by UUID

    `GET /analytics/prp/25ea3fae-4220-11e4-86da-2c44fd7f1164`

    ```json
    {
      "ok": true,
      "results": "not implemented yet"
    }
    ```


 * Traffic Usage By UUID

    `GET /analytics/traffic/MultiBitrateVid.mp4`

    ```json
    {
      "ok": true,
      "results": [{
        "key": ["MultiBitrateVid.mp4", 2014, 11, 22],
        "value": {
          "sum": 1200,
          "count": 48,
          "min": 25,
          "max": 25,
          "sumsqr": 30000
        }
      }]
    }
    ```


 * Traffic Usage By IP

    `GET /analytics/trafficIp/172.16.35.15`

    ```json
    {
      "ok": true,
      "results": [{
        "key": ["172.16.35.15", 2014, 11, 22],
        "value": {
          "sum": 1260,
          "count": 50,
          "min": 25,
          "max": 30,
          "sumsqr": 31800
        }
      }]
    }
    ```



### ip location services ###

  https://github.com/rs/node-netmask
  
  http://www.telize.com/geoip?callback=?%22
  
  http://freegeoip.net/
  
  http://services.ce3c.be/ciprg/?countrys=IRAN+%28ISLAMIC+REPUBLIC+OF%29%2C&format=shareaza&format2=Country+%3A%3A+%7Bcountry%7D%0D%0AStart+IP+of+range+%3A%3A+%7Bstartip%7D%0D%0AEnd+IP+of+range+%3A%3A+%7Bendip%7D%0D%0ANetmask+%3A%3A+%7Bnetmask%7D%0D%0A
