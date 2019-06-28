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

app.get('/getUsers', (req, res) => {
    connection.query('SELECT * FROM users;', (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
    });
});

app.get('/getUserRoles', (req, res) => {
    connection.query('SELECT * FROM user_role;', (err, rows, fields) => {
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

app.delete('/deleteAnUser/:UserId', (req, res) => {
    const { UserId } = req.params;
    if (!UserId) return;
    connection.query('DELETE FROM users WHERE userid = ?', UserId, (err, rows, fields) => {
        if (err) throw err;
        console.log(`you delete ${rows.affectedRows} row`);
    });
    connection.query('DELETE FROM user_role WHERE user_id = ?', UserId, (err, rows, fields) => {
        if (err) throw err;
        console.log(`you delete ${rows.affectedRows} row`);
    });
});

app.post(`/insertAPet`, (req, res) => {
    const { name, age, type, genus, desc, owner  } = req.body;
    const values = [name, type, genus, age, desc, owner];
    connection.query(`INSERT INTO pet (isim, tur, cins, yas, aciklama, user) VALUES (?, ?, ?, ? ,?, ?);`, values , err => {
        if (err) throw err;
        console.log(`${name} INSERTED`);
    });
});

app.post(`/editAPet`, (req, res) => {
    const { id, name, age, type, genus, desc, owner  } = req.body;
    const values = [name, type, genus, age, desc, owner];
    const sqlcom = `UPDATE pet SET isim = ? , tur = ? , cins = ? , yas = ? , aciklama = ? , user = ?  WHERE id = ` + id + `;`
    connection.query(sqlcom , values , err => {
        if (err) throw err;
        console.log(`${name} UPDATED`);
    });
});

app.listen(port, err => {
    if (err) throw err;
    console.log(`Server is listening on ${port}`);
});