const app = require('express')();
const ngrok = require('ngrok');
const PORT = 3000;
const NGROK_AUTH = '25EqWHVn2o4EaXW...'; // abhardwaj1@kloudrac.com (https://ngrok.com)

// http://localhost:3000
app.get('/', (req, res) => {
    res.json({ 'isWorking': true })
});

const server = app.listen(PORT, async () => {
    const url = await ngrok.connect({  addr: PORT, authtoken: NGROK_AUTH });
    console.log("Local Server Started:", `http://localhost:${PORT}`);
    console.log("Global Server Started:", url);
});

exports.server =  server

