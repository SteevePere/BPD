//Get user
exports.get = async function(req, h) {

	const mysql = req.mysql.pool
	const login = req.headers[ 'login' ];
	const password = req.headers[ 'password' ];
	try {

			const [row, fields] = await mysql.query('SELECT * FROM users WHERE login = ? and password = ?;',[login, password])
			const user = row[0]
			return user;
	}
	catch (err) {
		return { err };
	}
}
