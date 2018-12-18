//Get current app user
exports.login = async function(req, h) {

	const mysql = req.mysql.pool;
	const login = req.headers[ 'login' ];
	const password = req.headers[ 'password' ];

	try {
			const [line, column] = await mysql.query('SELECT status FROM users WHERE login = ? and password = ?;',[login, password]);
			const status = line[0]["status"];

			if (status == 'OFF') {
				return h.response({ message: 'Forbidden', code: 403}).code(403);
			}

			const [row, fields] = await mysql.query('SELECT * FROM users WHERE login = ? and password = ?;',[login, password]);
			const user = row[0];

			const pending = "OFF";
			const [name, attrib] = await mysql.query('SELECT COUNT(login) AS total_notifs FROM users WHERE status = ?;',[pending]);
			const notifs = name[0];
			return h.response({ notifs: notifs, data: user, code: 200}).code(200);
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}

//Get all accounts
exports.all_users = async function(req, h) {

	const mysql = req.mysql.pool;
	const token = req.headers[ 'authorization' ];
	const id = req.params.id;
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token]);

	try {
		const role = row[0]['role'];

		if (role == 'chief') {
			const [row, fields] = await mysql.query('SELECT * FROM users');
			const user = row;
			return h.response({ data: user, code: 200 }).code(200);
		}
		else return h.response({ message: 'Forbidden', code: 403}).code(403);
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}

//Get all pending accounts (status = OFF)
exports.pending = async function(req, h) {

	const mysql = req.mysql.pool;
	const token = req.headers[ 'authorization' ];
	const id = req.params.id;
	const status = 'OFF';
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token]);

	try {
		const role = row[0]['role'];

		if (role == 'chief') {
			const [row, fields] = await mysql.query('SELECT * FROM users WHERE status = ?;',[status]);
			const user = row;
			return h.response({ data: user, code: 200 }).code(200);
		}
		else return h.response({ message: 'Forbidden', code: 403}).code(403);
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}

//Activate pending user account (set status to ON)
exports.activate = async function(req, h) {

	const mysql = req.mysql.pool;
	const token = req.headers[ 'authorization' ];
	const id = req.params.id;
	const status = 'ON';
	const pending = 'OFF';
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token]);

	try {
		const role = row[0]['role'];

		if (role == 'chief') {
			const [row, fields] = await mysql.query('UPDATE users SET status = ? WHERE id = ?;',[status, id]);
			const [line, columns] = await mysql.query('SELECT * FROM users WHERE status = ?;',[pending]);
			const user = line;
			return h.response({ message: 'Updated', data: user, code: 200}).code(200);
		}
		else return h.response({ message: 'Forbidden', code: 403}).code(403);
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}

//Block user account (set status to OFF)
exports.block = async function(req, h) {

	const mysql = req.mysql.pool;
	const token = req.headers[ 'authorization' ];
	const id = req.params.id;
	const status = 'OFF';
	const pending = 'OFF';
	const [row, fields] = await mysql.query('SELECT role FROM users WHERE token = ?;',[token]);

	try {
		const role = row[0]['role'];

		if (role == 'chief') {
			const [row, fields] = await mysql.query('UPDATE users SET status = ? WHERE id = ?;',[status, id]);
			const [line, columns] = await mysql.query('SELECT * FROM users WHERE status = ?;',[pending]);
			const user = line;
			return h.response({ message: 'Updated', data: user, code: 200}).code(200);
		}
		else return h.response({ message: 'Forbidden', code: 403}).code(403);
	}
	catch (err) {
		return h.response({ message: 'Unauthorized', code: 401}).code(401);
	}
}
