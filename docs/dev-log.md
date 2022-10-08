# aws-serverless03 - REST-API with serverless and Typescript

# Create Project Skeleton with serverless

Create the project (according [Getting Started With Serverless Framework](https://www.serverless.com/blog/getting-started-with-serverless-framework?utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz-_COZtxRg6ggR37oqx_3BLZ2k5OldU4miXeoZ4y5DIa9Vd0zoMT4iF3XVR9XG4fWMIILPnu)) with 

  serverless
    there in: 
    - choose template 'AWS  - Nodes.js - ExpressAPI'
    - choose project name
    - choose 'n' for login/register to Serverless Dashboard 


The result is a minimal project with 
- package.json
  {
    "name": "aws-serverless03",
    "version": "1.0.0",
    "description": "",
    "dependencies": {
      "express": "^4.17.1",
      "serverless-http": "^2.7.0"
    }
  }
- handler.js
  const serverless = require("serverless-http");
  const express = require("express");
  const app = express();

  app.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "Hello from root!",
    });
  });

  app.get("/hello", (req, res, next) => {
    return res.status(200).json({
      message: "Hello from path!",
    });
  });

  app.use((req, res, next) => {
    return res.status(404).json({
      error: "Not Found",
    });
  });

  module.exports.handler = serverless(app);
- serverless.yml
  service: aws-serverless03
  frameworkVersion: '3'

  provider:
    name: aws
    runtime: nodejs14.x

  functions:
    api:
      handler: handler.handler
      events:
        - httpApi: '*'


# Add region to provider in serverless.yml

  provider:
    name: aws
    region: eu-west-3
    runtime: nodejs14.x

# Add URL support to function in serverless.yml

  functions:
    hello:
      handler: src/handler.handler
      url: true

# Add Typescript Support

Add typescript to project with

  tsc -init
  npm i -D typescript
  npm i -D @types/express

In tsconfig.json 
- change 'target' from 'es5' to 'es2016'
- uncomment 'rootdir' with 'src'

Install serverless Typescript plugin with

  npm i -D serverless-plugin-typescript

Add typescript plugin to serverless.yml

  plugins:
    ...
    - serverless-plugin-typescript
    ...

Rename handler.js to handler.ts
Create folder src
Move handler.ts to folder src
Adapt handler.ts to es2016
- from
  const serverless = require("serverless-http");
  const express = require("express");
  ...
  module.exports.handler = serverless(app);

- to
  import  serverless  from 'serverless-http';
  import express from 'express';
  ...
  export const handler = serverless(app);

Adapt serverless.yml
- from
  functions:
    api:
      handler: handler.handler
      ...
- to
  functions:
    api:
      handler: src/handler.handler
      ...
