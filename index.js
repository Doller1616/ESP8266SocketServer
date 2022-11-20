const express = require('express');
const cors = require('cors');
const app = express();
const POST = process.env.PORT || '8080';

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hi! Its Keshav Tomar...")
})

app.listen(POST, () => {
  console.log(`Server started on http://localhost:${POST}`)
})
