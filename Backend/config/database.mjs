import mysql from 'mysql';

const pool  = mysql.createPool({
  host: '94.130.216.164',
  user: 'jpmotors_dtrujillo',
  password: 'Sopadepollo2024.',
  database: 'jpmotors_bd'
});

function query(sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results, fields) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export { 
  pool, 
  query 
};