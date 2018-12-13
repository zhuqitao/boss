const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const _filter = {'pwd': 0, '__v': 0};
Router.get('/list', (req, res) => {
    // User.remove({}, (err, doc) => {});
    User.find({}, (err, doc) => {
        return res.json(doc);
    })
})
Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body;
    User.find({user}, (err, doc) => {
        console.log(doc);
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

function md5Pwd(pwd){
    const salt = 'zhuqitao_';
    return utils.md5(utils.md5(pwd + salt));

}

module.exports = Router;