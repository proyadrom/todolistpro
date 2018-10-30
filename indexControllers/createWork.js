const model = require('../model');
const uuid = require('node-uuid');


let
    User = model.user,
    Work = model.work;

var CR_createWork = async(ctx, next) => {
    var
        username = ctx.session.username || '',
        brief = ctx.request.body.brief || '',
        detail = ctx.request.body.detail || '',
        beginTime = ctx.request.body.beginTime || '',
        endTime = ctx.request.body.endTime || '';
    if(username && Date.now() - ctx.session.time < 10000000000) {
        if(!brief) {
            console.log('111');
            ctx.render('create.html');
        } else {
            beginTime.replace('T', ' ');
            endTime.replace('T', ' ');
            var status = 'Open';
            var newWork = await Work.create({
                username: username,
                brief: brief,
                detail: detail,
                startTime: beginTime,
                endTime: endTime,
                status: status,
                TID: uuid.v4()
            });
            ctx.response.redirect('/todolist');
        }
    } else {
        ctx.render('signin.html', {

        });
    }
};


module.exports = {
    'GET /create' : CR_createWork,
    'POST /create' : CR_createWork
};