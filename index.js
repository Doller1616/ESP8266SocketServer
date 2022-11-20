const express = require('express');
const cors = require('cors');
const app = express();
const POST = process.env.PORT || '8080';

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hi! Its Working...")
})

app.listen(POST, (req, res) => {
  console.log(`Server started on http://localhost:${POST}`)
})
