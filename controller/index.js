const {exec,escape} = require('../db/index.js');
const xss = require('xss');
const md5 = require('../util/crypto')
const getList = function(author,keyword) {
        let sql = 'select * from blogs where blogscol = 0';
        if(author) {
         sql += ` and author = ${author}`;
        }
        if(keyword) {
         sql += ` and title like '%${keyword}%'`;
        }
        return exec(sql,[]);
}
const getDetail = function(id) {
    let sql = 'select * from blogs where id = ? and blogscol = 0';
    return exec(sql,[id]);
};
const login = function(username,password) {

   /* let sql = 'select * from users where username = ? and password = ?';
    return exec(sql,[username,password]).then(v=>v[0],e=>{

        return null;
    });*/
    username = escape(username);
    password = md5(password);
    password = escape(password);

    let sql = `select * from users where username = ${username} and password = ${password} `;

    return exec(sql,[]).then(v=>v[0],e=>{

        return null;
    });
};
const updateBlog = function(id,postData) {
    let sql = "update blogs set title = ?,content = ? where blogscol = 0 and id = "+id;
    return exec(sql,[postData.title,postData.content]);
};
const deleteBlog = function(id) {
    let sql = "delete from blogs where blogscol = 0 and id = "+id;
    return exec(sql,[]);
};
const newBlog = function(postData) {

    let sql = "insert into blogs set ?";
    postData.title = xss(postData.title);
    postData.content = xss(postData.content);
    return exec(sql,postData);
}
module.exports = {
    newBlog,
    deleteBlog,
    updateBlog,
    login,
    getList,
    getDetail
}