import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

require('dotenv').config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
  .use(compression({ threshold: 0 }), sirv('static', { dev }), sapper.middleware())
  .listen(PORT, (err) => {
    if (err) console.log('error', err);
  });
