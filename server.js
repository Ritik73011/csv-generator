const express = require('express');
const cors = require('cors');
const csvRoute = require('./routes/csvGeneratorRoute')
const app = express();

app.use(cors());
app.use(csvRoute)

app.listen(5000, () => {
    console.log("App listening on port 5000");
})