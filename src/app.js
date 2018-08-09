import express from 'express';
import morgan from 'morgan';
import mysql from 'mysql';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const connection = mysql.createConnection({
    host: 'shareddb-i.hosting.stackcp.net',
    user: 'jinoolee',
    password: 'jinoolee1234',
    database: 'SocialCalendar-3337d468'
});

connection.connect((err) =>{
    if(err){
        console.log("error:", err);
    } else{
        console.log('Remote DB connected!');
    }
});

app.get('/', (req, res) => {
    res.send('api template!');
});

app.get('/entries/:userId/:personId', (req, res) => {

    const {userId, personId} = req.params;

    let query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
    const inserts = ['entries', 'user_id', userId, 'person_id', personId];
    query = mysql.format(query, inserts);

    connection.query(query, (err, results) => {
        if (err) {
            res.send(err);
            console.log('error:', err);
        } else {
            const resultJson = JSON.parse(JSON.stringify(results));
            // const apiResult = {
            //     data: resultJson
            // };

            res.json(resultJson);
        }

    });

});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});