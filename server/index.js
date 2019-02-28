import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './user';
import model from './model';

import csshook from 'css-modules-require-hook/preset';
// import assethook from 'asset-require-hook';

require('asset-require-hook')({
    extensions: ['png']
  })
/* eslint-disable */
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {StaticRouter} from 'react-router-dom'
import rootReducer from '../src/redux/reducer';
import App from '../src/App';
import {renderToString, renderToNodeStream} from 'react-dom/server'
import staticPath from '../build/asset-manifest.json';


const cookieParser = require('cookie-parser');

const Chat = model.getModel('chat');
const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);




io.on('connection', (socket) => {
    // console.log('user login');
    socket.on('sendmsg',data=> {
        console.log('sendmsg:', data);
        // io.emit('recvmsg', data);
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('-');
        Chat.create({chatid, from, to, content: msg},(err, doc) => {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/user', userRouter);
app.use(function(req,res,next){
    if(req.url.startsWith('/api') || req.url.startsWith('/static')){
        return next()
    }
    const store = createStore(rootReducer, compose(
        applyMiddleware(thunk)
    ))
    let context = {}
    // const markup = renderToString(
    //     (<Provider store={store}>
    //         <StaticRouter location={req.url} context={context}>
    //             <App></App>
    //         </StaticRouter>
    //     </Provider>)
    // )
    res.write(
        `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <title>React App</title>
            <link rel="stylesheet" href="${staticPath['static/css/1.8c38597f.chunk.css']}">
            <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
            <script>
            if ('addEventListener' in document) {
                document.addEventListener('DOMContentLoaded', function() {
                    FastClick.attach(document.body);
                }, false);
            }
            if (!window.Promise) {
                document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"' + '>' + '<' + '/' + 'script>');
            }
            </script>
        </head>
        
        <body>
            <noscript>
                You need to enable JavaScript to run this app.
            </noscript>
            <div id="root">
        `
    )
    const markup = renderToNodeStream(
        (<Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App></App>
            </StaticRouter>
        </Provider>)
    )
    markup.pipe(res, {end:false})
    markup.on('end', () => {
        res.write(`
        </div>
        
        <script src="${staticPath['runtime~main.js']}"></script>
        <script src="${staticPath['main.js']}"></script>
        <script src="${staticPath['static/js/1.0e62f054.chunk.js']}"></script>
       
    </body>
    
    </html>
        `)

        res.end()
    })


    const pageHtml = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>React App</title>
        <link rel="stylesheet" href="${staticPath['static/css/1.8c38597f.chunk.css']}">
        <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
        <script>
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
        if (!window.Promise) {
            document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"' + '>' + '<' + '/' + 'script>');
        }
        </script>
    </head>
    
    <body>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${markup}</div>
        
        <script src="${staticPath['runtime~main.js']}"></script>
        <script src="${staticPath['main.js']}"></script>
        <script src="${staticPath['static/js/1.0e62f054.chunk.js']}"></script>
       
    </body>
    
    </html>
    `
    // res.send(pageHtml)
    // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(8888);

