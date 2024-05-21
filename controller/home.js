import sqlConfig from "../server/sqlconfig.js"
import sql from 'mssql'

async function getCategories(){
    //รับหมวดหมู่สินค้า
    try{
        let Data = await sql.connect(sqlConfig)
            .then(pool=>{
                return pool.request().query("SELECT * FROM Categories")
            }).then(result =>{
                console.log(result);
                return result.recordsets
            }).catch(err =>{
                return err;
            });
        return Data;
    }
    catch (error){
        console.log(error);
    }
}
getCategories();