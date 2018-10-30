const fs = require('fs');

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/indexControllers');
    var filesJS = files.filter((f) => {
        return f.endsWith('.js');
    });
    for(var f of filesJS) {
        console.log(`Process: ${f}`);
        let mapping = require(__dirname + '/indexControllers/' + f);
        for(var url in mapping) {
            if(url.startsWith('GET ')) {
                var path = url.substring(4);
                router.get(path, mapping[url]);
                console.log(`Register URL mapping: GET ${path}`);
            } else if(url.startsWith('POST')) {
                var path = url.substring(5);
                router.post(path, mapping[url]);
                console.log(`Register URL mapping: POST ${path}`);
            } else {
                console.log(`invalid URL: ${url}`);
            }
        }
    }
}

module.exports = function() {
    let
        router = require('koa-router')();
    addControllers(router);
    return router.routes();
};