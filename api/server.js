import { createServer } from "json-server";

const server = createServer();
const router = require('json-server').router('db.json');
const middlewares = require('json-server').defaults();

server.use(middlewares);
server.use(router);

// This is necessary for Vercel serverless functions
export default server.handle;
