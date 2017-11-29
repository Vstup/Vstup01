'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const func = require('./functions');
const get = require('./getData');

let info;

const server = (req, res)=>{

    const q = url.parse(req.url, true);
    const data = q.query;
    if (data.path){
        let path = data.path;
        const pib = data.pib;
        const prior = data.prior;
        get.getData(path,pib,prior);

        // noinspection JSAnnotator
        function answer(pib,prior) {
            info = get.obj;
            const causes = {
                'first':func.getNumOfOnePriority(info,pib),
                'first and second':func.getNumOfTwoPriority(info,pib),
                'first and second and third':func.getNumOfThreePriority(info,pib)
            }
            const answer = causes[prior];
            res.end(''+answer);
        }

        module.exports.answer = answer ;

            }else {
            //res.write(fs.readFileSync('home.html','utf8'));
            res.end(fs.readFileSync('home.html','utf8'));
    }
};

const runServer = http.createServer(server).listen(8080);