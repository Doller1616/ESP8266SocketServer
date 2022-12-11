const express = require('express');
const cors = require('cors');
const app = express();
const POST = process.env.PORT || '8080';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/', (req, res) => {
    res.send("Hi! Divyansh Kumar")
})

app.post('/hi', (req, res)=> {
  console.log(req.body, req.query, req.params);
  res.send("Working");
})

app.listen(POST, () => {
  console.log(`Server started on http://localhost:${POST}`);
})
