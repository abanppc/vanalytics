var dgram = require('dgram');
var parser = require('./parser');

exports.start = function (ip, port, cb) {
  syslogd = dgram.createSocket("udp4", function (msg, rinfo) {
    var message = msg.toString('ascii', 0, rinfo.size);
    msg = parser.parse(message, rinfo);
    cb(msg)
  });

  try {
    syslogd.bind(port, ip);
    console.log( '=========================================' );
    console.log( 'Listening for SYSLOG on ' + port );
    console.log( '=========================================' );
  } catch (e) {
    if(e.code == 'EACCES') {
      console.log('Permission to bind on port '+port+' denied. Use sudo instead!');
    } else {
      console.log(e);
    }
    process.exit(1);
  }
}
