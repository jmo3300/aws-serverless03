import { Express } from 'express';
import { getHelloMessage, getRootMessage } from './service';

const app_name = 'aws-serverless03';
const BASE_PATH = '/api/admin';

export const init = (app: Express) => {
  app.get(BASE_PATH + '/', (req, res, next) => {
    const message = getRootMessage();
    // return res.status(200).send(message);
    return res.status(200).render('message', { app_name, message })
    });
  
  app.get(BASE_PATH + '/hello/', (req, res, next) => {
    const message = getHelloMessage();
    return res.status(200).send(message);
  });
};