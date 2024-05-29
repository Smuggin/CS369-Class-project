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
export const getCategorize = async()=>{
  try{
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
    .query('SELECT * FROM Categories')
    return result.recordsets[0];
  }catch(err){
    console.log(err)
  }
}
export const getSupplierByID = async(id)=>{
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('SupplierID', sql.Int, id)
      .query('SELECT * FROM Suppliers WHERE SupplierID = @SupplierID');
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
}
export const getSuppliers = async()=>{
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .query('SELECT * FROM Suppliers');
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
}
export const getUnits = async()=>{
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query('SELECT DISTINCT Unit FROM Products');
    return result.recordsets[0];
  } catch (err) {
    console.log(err);
  }
}
export const postProducts = async(data)=>{
  try{
    const pool =await sql.connect(sqlConfig);
    const result = await pool.request()
    .input('ProductName', sql.VarChar, data.ProductName)
    .input('SupplierID',sql.Int,data.SupplierID)
    .input('CategoryID',sql.Int,data.CategoryID)
    .input('Unit', sql.VarChar, data.Unit)
    .input('Price',sql.Money,data.Price)
    .input('Pictures',sql.VarChar,data.Pictures)
    .query('INSERT INTO Products (ProductName,SupplierID,CategoryID,Unit,Price,Pictures) VALUES (@ProductName,@SupplierID,@CategoryID,@Unit,@Price,@Pictures)')
    return result.recordsets[0];
  }catch (err) {
    console.log(err);
  }
}
