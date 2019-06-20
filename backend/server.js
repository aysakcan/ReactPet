const express = require('express');
const app = express();
const connection = require('./secret.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3002;

connection.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get(`/`, (req, res) => {
    res.status(200).send('HELLO YOU !');
});

app.get('/getPet', (req, res) => {
    connection.query('SELECT * FROM pet;', (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
    });
});

app.delete('/deleteAPet/:PetId', (req, res) => {
    const { PetId } = req.params;
    if (!PetId) return;
    connection.query('DELETE FROM pet WHERE id = ?', PetId, (err, rows, fields) => {
        if (err) throw err;
        console.log(`you delete ${rows.affectedRows} row`);
    });
});

app.post(`/insertAPet/:data`, (req, res) => {
    const { data } = req.body;
    if (!name) return;
    connection.query(`INSERT INTO pet (isim, tur, cins, yas, aciklama, user) VALUES (?);`, data.name, data.type, data.genus, data.age, data.desc, data.owner, err => {
        if (err) throw err;
        console.log(`${name} INSERTED`);
    });
});

app.listen(port, err => {
    if (err) throw err;
    console.log(`Server is listening on ${port}`);
});