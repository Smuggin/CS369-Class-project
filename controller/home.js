import sql from 'mssql';

const sqlConfig = {
  server: 'LAPTOP-N6VQC1VS\\SQLEXPRESS',
  database: 'Northwind',
  user: 'sa',
  password: 'P@ssword1',
  port: 1433,
  encrypt: false,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  trustServerCertificate: false, // เพิ่มค่า trustServerCertificate เพื่อปิดการใช้งานใบรับรองของเซิร์ฟเวอร์
};

export const getProduct = async () => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query('SELECT * FROM Products');
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (id) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('ProductID', sql.Int, id)
      .query('SELECT * FROM Products WHERE ProductID = @ProductID');
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
};
export const getCategorizedByID = async (id)=>{
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('CategoryID', sql.Int, id)
      .query('SELECT * FROM Categories WHERE CategoryID = @CategoryID');
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
};
