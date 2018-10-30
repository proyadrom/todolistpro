const model = require('../model');


let
    User = model.user,
    Work = model.work;

var CR_detail = async (ctx, next) => {
    var id = ctx.params.id || '';
    if(id) {
        var work = await Work.findAll({
            where: {
                TID: id
            }
        });
        ctx.render('detail.html', {
            work: work[0]
        });
    } else {
        var ID = ctx.request.body.id || '';
        var
            brief = ctx.request.body.brief || '',
            detail = ctx.request.body.detail || '',
            status = ctx.request.body.status || ' ';
        var workNew = await Work.findAll({
            where: {
                TID: ID
            }
        });
        console.log(ctx.request.body);
        workNew[0].brief = brief;
        workNew[0].detail = detail;
        workNew[0].status = status;
        await workNew[0].save();
        ctx.response.redirect('/todolist');
    }


};

module.exports = {
    'GET /detail/:id' : CR_detail,
    'POST /detail' : CR_detail
};