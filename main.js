const http = require('http');
const express = require('express');
const ngrok = require('ngrok');
const setupSocketServer = require('./socketServer');
const PORT = 3000;
const NGROK_AUTH = '25EqWHVn2o4EaXW...'; // abhardwaj1@kloudrac.com (https://ngrok.com)

const app = express();
const server = http.createServer(app);

// http://localhost:3000
app.get('/', (req, res) => {
    res.json({ 'isWorking': true })
});

setupSocketServer(server);

server.listen(PORT, async () => {
    const url = await ngrok.connect({  addr: PORT, authtoken: NGROK_AUTH });
    console.log("Local Rest Server:", `http://localhost:${PORT}`);
    console.log("Global Rest Server:", url);
    console.log("Global Socket Server:", `wss://${url.slice(8, url.length)}`);
});

