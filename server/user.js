const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd': 0, '__v': 0};
Router.get('/list', (req, res) => {
    const {type} = req.query;
    // User.remove({}, (err, doc) => {});
    User.find({type}, (err, doc) => {
        return res.json({code: 0, data:doc});
    })
})
Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body;
    User.find({user}, (err, doc) => {
        if(doc.length) {
            return res.json({code: 1, msg: '用户已存在'});
        }
        const userModel = new User({user, type, pwd: md5Pwd(pwd)});
        userModel.save(((err, doc) => {
            if(err) {
                return res.json({code: 1, msg: '数据库错误'});
            }
            const {user, type, _id} = doc;
            res.cookie('userId', _id);
            return res.json({code: 0, data: {user, type, _id}});
        }))
    })
})
Router.post('/readmsg', (req, res) => {
    const userid = req.cookies.userId;
    const {from} = req.body;
    Chat.update({from, to: userid}, {'$set': {read: true}}, {'multi': true}, (err, doc) => {
        console.log(doc);
        if(!err) {
            return res.json({code: 0, num: doc.nModified})
        }
        return res.json({code: 1, msg: '修改失败'})
    })
})
Router.post('/update', (req, res) => {
    const {userId} = req.cookies;
    if(!userId) {
        return {code: 1};
    }
    const body = req.body;
    User.findByIdAndUpdate(userId, body, function(err, doc){
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type,
        }, body)
        return res.json({code: 0, data});
    })
})
Router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, doc) => {
        if(!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'});
        }
        res.cookie('userId', doc._id);
        return res.json({code: 0, data: doc});
    })
})
Router.get('/info', (req, res) => {
    const {userId} = req.cookies;
    if(!userId) {
        return res.json({code: 1, msg: '没有cookie'})
    }
    User.findOne({_id: userId}, _filter, (err, doc) => {
        if(err) {
            return res.json({code: 1, msg: '数据库错误'});
        }
        return res.json({code: 0, data: doc});
    })
})

Router.get('/getmsglist', (req, res)=>{
    const userId = req.cookies.userId;
    User.find({}, (err, userdoc) => {
        let users = {};
        userdoc.forEach(v=> {
            users[v._id] = {name: v.user}
        })
        Chat.find({'$or': [{from: userId},{to: userId}]}, (err, doc)=>{
            if(!err) {
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
    // {'$or': [{from: user, to: user}]}
    
})

function md5Pwd(pwd){
    const salt = 'zhuqitao_';
    return utils.md5(utils.md5(pwd + salt));

}

module.exports = Router;