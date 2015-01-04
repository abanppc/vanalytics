var express = require('express'),
    //db = require('./models'),
    config = require('./config.js'),
    bodyParser = require('body-parser'),
    app = express();

var cluster = require( 'cluster' );

// set app vars
app.set('views', __dirname + '/public/views');
app.set('port', config.server_port);

app.use(bodyParser.json());

// set middleware
app.use(express.static( __dirname + '/public' ));

var router = express.Router();
var routes = require('./routes')({});
router.get('/', routes.index);
router.post('/vview', routes.create);



router.get('/trafficIp/:ip', routes.trafficByIp);
router.get('/trafficIp/:ip/:startDate..:endDate', routes.trafficByIp);

router.get('/traffic/:uuid', routes.trafficByUUID);
router.get('/traffic/:uuid/:startDate..:endDate', routes.trafficByUUID);

router.get('/views/:uuid/:userid', routes.viewsByPosition);
router.get('/views/:uuid/:userid/:startDate..:endDate', routes.viewsByPosition);

router.get('/watches/:uuid/:userid', routes.watchesByUser);
router.get('/watches/:uuid/:userid/:startDate..:endDate', routes.watchesByUser);

router.get('/watches/:uuid', routes.watchesByUUID);
router.get('/watches/:uuid/:startDate..:endDate', routes.watchesByUUID);

router.get('/prp/:uuid', routes.prpByUUID);
router.get('/prp/:uuid/:startDate..:endDate', routes.prpByUUID);




app.use( config.app_path, router );
app.set('json spaces', 20);

if( cluster.isMaster ) {
    /*db.sequelize
    .sync({force: config.forceSchema})
    .complete(function (err) {
        if (err){
            console.log( "errr ", err );
            process.exit( -1 );
        } else {
            for (var i = 0; i < require('os').cpus().length; i++) {
                cluster.fork();
            }
        }
    });*/
    for (var i = 0; i < require('os').cpus().length; i++) {
        cluster.fork();
    }
} else {

    require( './sysCouchLog' );

    app.listen(app.get('port'), function () {
        console.log( '=========================================' );
        console.log( 'Listening for Analytics on ', app.get('port') );
        console.log( '=========================================' );
    });

    process.on( 'uncaughtException', function(err){
        console.error( err );
    });
}
