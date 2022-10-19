const express = require('express')
const cors = require('cors')
const menu = require('../server/data.json');
const app = express()
app.use(cors());



app.get('/', function(req, res) {
    const resp = menu
    res.send(resp)
})
app.listen(7000, () => {
    console.log(`Example app listening on port 7000`)
});