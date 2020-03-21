const express = require('express');
const router = express.Router();
const {
    getList,
    getDetail,
    updateBlog,
    deleteBlog,
    newBlog
} = require('../controller/index');
const {
    successModel,
    failModel
} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck')
router.get('/list',(req,res,next)=>{
    let author = req.query.author || "";
    let keyword = req.query.keyword || "";
    if(req.query.isadmin) {
         next();
    } else {
        getList(author,keyword).then(data=>{
            res.json(new successModel(data));
        });
    }


},loginCheck,function(req,res){
    let author = req.session.username;
    let keyword = req.query.keyword || "";
    getList(author,keyword).then(data=>{
        res.json(new successModel(data));
    });
});
router.get('/detail',(req,res)=>{
    let id = req.query.id;
    getDetail(id).then(data=>{
        res.json(new successModel(data));
    });

});
router.post('/update',loginCheck,(req,res)=>{
   /* let result = loginCheck(req);
    if(!result) {
        return new failModel('尚未登陆');
    }*/
    let id = req.query.id;
    let postData = req.body;
    updateBlog(id,postData).then(data=>{
        res.json(new successModel(data));
    });

});
router.post('/del',loginCheck,(req,res)=>{
    /*let result = loginCheck(req);
    if(!result) {
        return new failModel('尚未登陆');
    }*/
    let id = req.query.id;
    let data = deleteBlog(id);
    return new successModel(data);
});
router.post('/new',loginCheck,(req,res)=>{
    /*let result = loginCheck(req);
    if(!result) {
        return new failModel('尚未登陆');
    }*/
    let postData = req.body;
    postData.id = null;
    postData.blogscol = 0;
    postData.createtime = (new Date()).toUTCString();
    postData.author = req.session.username;
    newBlog(postData).then(()=>{
        res.json(new successModel("创建成功"));
    });

});
module.exports = router;
