const express = require('express');

const dotenv = require('dotenv');
var cors = require('cors')  //use this



dotenv.config({ path: '.env-local' });
const PORT = process.env.PORT || '3001';

const pool = require('./database');

const app = express();
app.use(cors()) //and this

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/', async function (req, res) {
	const sqlQquery = 'Select id,name,email,role from user where email=? and password=?';
	const rows = await pool.query(sqlQquery, [req.body.email, req.body.Password]);
	if (rows[0] != undefined) {
		res.status(200).json(rows);
	}
	else {
		res.status(400).json({ error: 'email or password is wrong' });
	}
});
app.get('/', async function (req, res) {
	const sqlQquery = 'Select id,name,email,role from user';
	const rows = await pool.query(sqlQquery);
	res.status(200).json(rows);
});

app.get('/:id', async function (req, res) {
	const sqlQquery = 'Select * from user where id=?';
	const rows = await pool.query(sqlQquery, req.param.id);
	res.status(200).json(rows);
})

app.listen(PORT, () => {
	console.log(`port ${PORT}`);
})