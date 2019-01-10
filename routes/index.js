const express = require('express')
const router = express.Router()
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const mongoose = require('mongoose')

const db = mongoose.connect("mongodb://em_memo:em_memo1@ds255403.mlab.com:55403/em_memo", { useNewUrlParser: true }).then(
    () => { console.log('DataBase is connected'); } ,
    err => { console.log('Check DB - Connection error : '); 
});
const Schema = mongoose.Schema;

const Memo = new Schema({
    author: String,
    contents: String,
    date: Date
});

const memoModel = mongoose.model('Memo', Memo);

router.get('/',(req, res) => {
    res.render('index', {title: 'Express'});
});

router.get('/load',(req, res) => {
    memoModel.find({} , (err, data) => {
        res.json(data);
    });
});

router.post('/write',(req, res) => {
    const author = req.body.author;
    const contents = req.body.contents;
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const memo = new memoModel();

    memo.author = author;
    memo.contents = contents;
    memo.date = date;
    memo.comments = [];

    memo.save((err) => {
        if (err) {
            throw err;
        }
        else {
            res.json({status: "SUCCESS"});
        }
    });
});

router.post('/del', (req, res) => {
    const _id = req.body._id;
    memoModel.deleteOne({_id: _id}, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.json({status: "SUCCESS"});
        }
    });
});

router.post('/modify', (req, res) => {
    const _id = req.body._id;
    const contents = req.body.contents;

    memoModel.findOne({_id:_id}, (err, memo) => {
        if (err) {
            throw err;
        }
        else {
            memo.contents = contents;

            memo.save((err) => {
                if (err) {
                    throw err;
                }
                else {
                    res.json({status: "SUCCESS"});
                }
            });
        }
    });
});

module.exports = router;
