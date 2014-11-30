# Video Client & Analytics Server #
  
  Simple video player client (based on JWPlayer) with a configurable analytics server in node.js

## Pre Install ##
  install Apache CouchDB, [see installation guide](https://github.com/abanppc/sysCouchLog/wiki/Installing-on-CentOS-7)
   
## Install ##

    git clone https://github.com/abanppc/vanalytics.git
    cd vanalytics
    npm install .


## Post Install ##

  Optionally configure your reverse proxy (e.g. nginx) to the proxy_pass to your node.js server


## Configuration ##

  Update [config file](config.js)


## Upload Views to CouchDB ##

    ./pushapp couchdb_user couchdb_pass couchdb_host[=localhost]
    

## Run ##

from the installation directory run
    
    npm start
    

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
      "results": [{
        "plays": {
          "1": 1,
          "2": 1,
          "3": 2,
          "4": 2,
          "5": 2,
          "6": 2,
          "7": 2,
          "8": 2,
          "9": 2,
          "10": 2,
          "11": 2,
          "12": 2,
          "13": 2,
          "14": 2,
          "15": 2,
          "16": 2,
          "17": 2,
          "18": 2,
          "19": 2,
          "20": 2,
          "21": 2,
          "22": 2,
          "23": 2,
          "24": 2,
          "25": 2,
          "26": 1,
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
        },
        "replays": {
          "27": 1,
          "28": 1,
          "29": 1,
          "30": 1
        }
      }]
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



### Extra: IP location services references ###

  [netmask](https://github.com/rs/node-netmask)
  
  [geoip](http://www.telize.com/geoip?callback=?%22)
  
  [freegeoip](http://freegeoip.net/)
  
  [sample service](http://services.ce3c.be/ciprg/?countrys=IRAN+%28ISLAMIC+REPUBLIC+OF%29%2C&format=shareaza&format2=Country+%3A%3A+%7Bcountry%7D%0D%0AStart+IP+of+range+%3A%3A+%7Bstartip%7D%0D%0AEnd+IP+of+range+%3A%3A+%7Bendip%7D%0D%0ANetmask+%3A%3A+%7Bnetmask%7D%0D%0A)
