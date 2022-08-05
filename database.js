const mariadb = require('mariadb');

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	connection: 5
});

pool.getConnection((err, con) => {
	if (err) {
		console.log('Error');
	}
	if (con) {
		con.release();
	}
});

module.exports = pool;