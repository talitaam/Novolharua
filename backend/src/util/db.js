import mysql from "mysql";
import config from "./config";

const pool = mysql.createPool(config);

class db {
	hasParamInQuery (sql, key) {
		return sql.indexOf("@" + key) !== -1;
	}
    
	prepareQuery (sql, params) {
		for (let key in params) {
			if (this.hasParamInQuery(sql, key)) {
				let value = mysql.escape(params[key]);
				sql = sql.replace("@" + key, value);
			}
		}
		return sql;
	}

	runQuery (query, params) {
		return new Promise ((resolve, reject) => {
			try {
				if(params)  
					query = this.prepareQuery(query, params);

				pool.getConnection(function (err, conn) {
					if (err) {
						conn.release();
						reject (err);
						throw err;
					}

					conn.query(query, params, function (err, rows) {
						conn.release();
						if (!err) {
							resolve(rows);
						} else {
							reject(err);
						}
					});

					conn.on("error", function (err) {
						conn.release();
						reject (err);
						throw err;
					});
				});
			} catch (e) {
				reject(e);
				throw e;
			}
		}).catch(e => {
			throw e;
		});
	}
}

export default new db ();