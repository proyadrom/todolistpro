const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./readDir');
let staticFiles = require('./static-files');
const isProduction = process.env.NODE_ENV === 'production';
const templating = require('./templating.js');
const session = require('koa-session');
const app = new Koa();

app.keys = ['SECICEYEA'];
const SESS_CONFIG = {
    key: 'koa:sess',
    maxAge: 1000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};

app.use(session(SESS_CONFIG, app));



app.use(async (ctx, next) => {
    //console.log(`Receive connect on: ${ctx.request.method} ${ctx.request.url}.`);
    await next();
});

app.use(staticFiles('/static/', __dirname + '/static'));

app.use(bodyParser());

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller());

app.listen(8080);
console.log('Koa run on port 8080!');