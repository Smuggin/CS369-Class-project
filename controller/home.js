import sql from 'mssql'
const sqlConfig ={
    server: 'LAPTOP-N6VQC1VS\\SQLEXPRESS',
    database : 'Northwind',
    user: 'sa',
    password: 'P@ssword1',
    port:'1433',
    encrypt: false,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
    trustServerCertificate: false // เพิ่มค่า trustServerCertificate เพื่อปิดการใช้งานใบรับรองของเซิร์ฟเวอร์
};
console.log("work");
sql.connect(sqlConfig)
    .then(pool => {
        return pool.request().query('SELECT * FROM Products WHERE ProductID = 77');
    }).then(result => {
        console.log('ProductID:', result.recordset[0].ProductID);
        console.log('ProductName:', result.recordset[0].ProductName);
        console.log('SupplierID:', result.recordset[0].SupplierID);
        console.log('CategoryID:', result.recordset[0].CategoryID);
        console.log('QuantityPerUnit:', result.recordset[0].QuantityPerUnit);
        console.log('UnitPrice:', result.recordset[0].UnitPrice);
        console.log('UnitsInStock:', result.recordset[0].UnitsInStock);
        console.log('UnitsOnOrder:', result.recordset[0].UnitsOnOrder);
        console.log('ReorderLevel:', result.recordset[0].ReorderLevel);
        console.log('Discontinued:', result.recordset[0].Discontinued);
        console.log('output:', result.output);
        console.log('rowsAffected:', result.rowsAffected);
    }).catch(err => {
        console.error('Error:', err);
    });
