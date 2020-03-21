const {
    successModel,
    failModel
} = require('../model/resModel');
function loginCheck(req,res,next) {
    setTimeout(()=>{
        if(!req.session.username) {
            return res.json(
                new failModel('登陆未成功')
            );
        }
        next();
    });
}
module.exports = loginCheck;