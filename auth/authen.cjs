const router =require("express").Router();
const passport = require("passport")
const CLIENT_URL = "http://localhost:5173/"
var crypto = require('crypto');
const sql = require('mssql')
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
router.get("/login/success",(req,res)=>{
    if(req.user){
      console.log("login/success/", req.user)
    res.status(200).json({
        success:true,
        message:"successfull",
        user: req.user,
        // cookies:req.cookies
    });
}
});
router.get("/logout",(req,res)=>{
      req.logout();
      res.redirect(CLIENT_URL);
})
router.post('/password',async (req,res,next)=>{
        console.log(req.body.username,req.body.password)
          try {
            const pool = await sql.connect(sqlConfig);
            let result = await pool.request()
            .input('email',sql.VarChar,req.body.username)
            .input('password',sql.VarChar,req.body.password)
            .query('SELECT * FROM users WHERE email = @email')
            if (result.recordset.length === 0) {return res.redirect('login/failed') }
            let row = result.recordset[0];
            crypto.pbkdf2(req.body.password,row.salt,310000,32 ,'sha256',function(err,hasedpassword){ 
              if (err){
                console.log(err)
                return res.redirect('login/failed')}
              if(!crypto.timingSafeEqual(row.password, hasedpassword)){
                return res.redirect('login/failed');
              }
              let user ={
                id:row.user_id,
              //   name:row.name,
                email:row.email
              }
              // console.log(user.id)
              // console.log(user.email)
              // console.log(user.name)
              console.log("User authenticated:", row); // Log authenticated user
              req.session.passport={
                user: user.id
              }
              req.user = row;
              console.log("session:", req.session.passport)
              console.log("user:",req.user)
              return res.status(200).json({
                success:true,
                message:"successfull",
                user: req.user,
                sessionStorage: req.session.passport,
              })
            })
          }catch (err){
            return next(err)
          }
      });
router.post("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

router.get("/google/callback",(req,res,next)=>{
    console.log("D:",req.isAuthenticated())
    const authFunc = passport.authenticate("google",{
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
})
    authFunc(req,res,next);
});

// router.get("/google/callback", passport.authenticate("google",{
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed"
// }));
router.get("/login/failed",(req,res)=>{
    res.redirect(CLIENT_URL);
})

module.exports = router