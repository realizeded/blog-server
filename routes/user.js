const express = require('express');
const router = express.Router();
const {
    login
} = require('../controller/index');
const {
    successModel,
    failModel
} = require('../model/resModel');
router.post('/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    login(username,password).then(data=>{
        if(data) {
            req.session.username = data.username;
            req.session.realname = data.realname;
            // set(req.sessionId,req.session);
            res.json(new successModel("登陆成功"));

        }else {
            res.json(new failModel("登陆失败"));
        }
    });



});

/*router.get('/session-test',(req,res)=>{
   if(req.session.username) {
       res.json(new successModel('登陆成功'));
   } else {
       res.json(new successModel('登陆失败'));

   }

});*/
module.exports = router;
