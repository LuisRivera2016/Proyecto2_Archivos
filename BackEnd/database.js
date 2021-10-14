const oracledb = require('oracledb');

Datos = {
  user: 'dummy',
  password: 'dummy',
  connectString: 'localhost:1521/ORCLCDB.localdomain'
}

async function Connection(sql, binds, autoCommit) {
  let open = await oracledb.getConnection(Datos);
  let consulta = await open.execute(sql, binds, { autoCommit });
  open.release();
  return consulta;
}

exports.Connection = Connection;