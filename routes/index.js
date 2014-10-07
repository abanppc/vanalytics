/**
 * Created by behrad on 10/7/14.
 */
// My module
function Models( orm ) {
//    console.log( "=================== ORM ", orm.VViewTest.create );
    return {
        index: function(req,res){
            res.json({ ok: true, status: "سلامت و سرافراز" });
        },
        create: function(req,res){
            var ip =
            orm.VView.create({
                ip: getClientAddress( req ),
                clientTime: req.body.clientTime,
                position: req.body.position,
                isFlash: req.body.isFlash,
                file: req.body.file,
                type: req.body.type,
                quality: req.body.quality,
                uuid: req.body.uuid
            }).on('success', function(viewLog) {
//                console.log( "Halle: ", viewLog );
            });
            res.json( {ok: true, message: "بازم نگاه کن" } );
        }
    };
}

var getClientAddress = function (req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress;
};

module.exports = Models;