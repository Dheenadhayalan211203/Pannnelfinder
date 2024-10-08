const express = require('express');
const app = express();
const sql = require('mysql');
const cors = require('cors')

app.use(express.json());
app.use(cors())

const hostname=process.env.host // host
const userdata=process.env.user   //user
const passworddata=process.env.pass //pass
const databasedata=process.env.db //db

let con; // Declare connection variable globally

async function connectdb() {
    try {
        con = sql.createPool({
            host: hostname,
            user: userdata,
            password: passworddata,
            database:databasedata
        });

        console.log('Database connection pool created');
    } catch (e) {
        console.log(e);
    }
}

connectdb();

app.post('/getdata', (req, res) => {
    const { mailid } = req.body; // Extract mailid from request body
    console.log(mailid)

    if (con) {
        const query = 'SELECT * FROM HEXAWARE WHERE mailid = ?'; // Use parameterized query
        con.query(query, [mailid], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(result);
            console.log(result)
        });
    } else {
        res.status(500).send('Database connection not established');
    }
});

app.listen(3000, () => {
    console.log('server is running on port 3000');
});
