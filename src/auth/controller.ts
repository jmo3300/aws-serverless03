import { Express } from 'express';
import { getHelloMessage, getRootMessage } from './service';

const BASE_PATH = '/api/auth';

export const init = (app: Express) => {

  app.get(BASE_PATH + '/', (req, res, next) => {
    const message = getRootMessage();
    return res.status(200).send(message);
  });
  
  app.get(BASE_PATH + '/hello/', (req, res, next) => {
    const message = getHelloMessage();
    return res.status(200).send(message);
  });
};