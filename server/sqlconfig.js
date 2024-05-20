import sql from "mssql";

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
// (async function () {
//     try {
//       console.log("sql connecting......")
//       let pool = await sql.connect(config)
//       let result = await pool.request()
//         .query('SELECT * FROM Products WHERE ProductID = 77')  // subject is my database table name
  
//       console.log(result )
  
//     } catch (err) {
//       console.log(err);  
//     }
//   })()

export default sqlConfig;