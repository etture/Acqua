const express = require('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const APIRouter = require('./router_API');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors());

//API route for all api requests
app.use('/api', APIRouter);

app.get('/', (req, res) => {
    res.send('api template for acqua!');
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});