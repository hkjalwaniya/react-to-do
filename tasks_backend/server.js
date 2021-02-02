import 'dotenv/config';
import connectToDb from './db/db-connection';
import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import Router from './routes/router';
import config from './config'
const server = express();

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());

server.use(cors());

server.options('*', cors());

new Router(server);

server.listen(process.env.APP_PORT, function() {
console.log('Server listening on port: %s', process.env.APP_PORT);
});

connectToDb();
