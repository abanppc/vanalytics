var express = require('express'),
    db = require('./models'),
    config = require('./config.js'),
    bodyParser = require('body-parser'),
    app = express();

var cluster = require( 'cluster' );

// set app vars
app.set('views', __dirname + '/public/views');
app.set('port', config.server_port);

app.use(bodyParser.json());

// set middleware
app.use(express.static(__dirname + '/public'));

var router = express.Router();
var routes = require('./routes')(db);
router.get('/', routes.index);
router.post('/vview', routes.create);

router.get('/trafficDaily/:file', routes.trafficByPath);
router.get('/viewsPosly/:file', routes.viewsByPosition);
router.get('/viewsPosly/:file/:startDate..:endDate', routes.viewsByPosition);
router.get('/viewsDaily/:file', routes.viewsByPath);
router.get('/viewsDaily/:file/:startDate..:endDate', routes.viewsByPath);


app.use( '/analytics', router );
app.set('json spaces', 20);

if( cluster.isMaster ) {
    db.sequelize
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
    });
} else {
    process.on( 'uncaughtException', function(err){
        console.error( err );
    });

    app.listen(app.get('port'), function () {
        console.log('Running on port: ', app.get('port'));
    });
}