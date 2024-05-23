const sql = require('mssql')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const axios = require("axios");
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
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
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    scope: ['profile','email']
  },
  async function verify(accessToken, refreshToken, profile, cb) {
    try {
        // Connect to the database using the imported configuration
        const pool = await sql.connect(sqlConfig);
      console.log(profile)
      console.log(profile._json.email)
        // Check for existing federated credentials
        let result = await pool.request()
            .input('provider', sql.VarChar, 'https://accounts.google.com')
            .input('subject', sql.VarChar, profile.id)
            .query('SELECT * FROM federated_credentials WHERE provider = @provider AND subject = @subject');

        if (result.recordset.length === 0) {
            // No federated credentials found, insert new user  
            let userResult = await pool.request()
                .input('name', sql.VarChar, profile.displayName)
                .input('email',sql.VarChar, profile._json.email)
                .query('INSERT INTO users (name,email) OUTPUT INSERTED.user_id VALUES (@name, @email)')

            let id = userResult.recordset[0].user_id;
            console.log(id)
            // Insert federated credentials
            await pool.request()
                .input('user_id', sql.Int, id)
                console.log("bug")
                .input('provider', sql.VarChar, 'https://accounts.google.com')
                .input('subject', sql.VarChar, profile.id)
                .query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (@user_id, @provider, @subject)');

            let user = {
                id: id,
                name: profile.displayName,
                email: profile._json.email
            };
            cb(null, user);
        } else {
            // Federated credentials found, get the user
            let row = result.recordset[0];
            let userResult = await pool.request()
                .input('user_id', sql.Int, row.user_id)
                .query('SELECT * FROM users WHERE user_id = @user_id');

            if (userResult.recordset.length === 0) {
                cb(null, false);
            } else {
                cb(null, userResult.recordset[0]);
            }
        }
    } catch (err) {
        cb(err);
    }
}
));
passport.use(new LocalStrategy(async function verify(username,password,cb){
  console.log(username,password)
    try {
      const pool = await sql.connect(sqlConfig);
      let result = pool.request()
      .input('email',sql.VarChar,username)
      .input('password',sql.VarChar,password)
      .query('SELECT * FROM users WHERE email = @email');
      if (err) {return cb(err)}
      let row = result.recordset[0];
      console.log(row)
      if (!row) {return cb(null,false,{message:"Incorrect username or password."}); }

      crypto.pbkdf2(password,row.salt,310000,32 ,'sha256',function(err,password){
        if (err){return cb(err);}
        if(!crypto.timingSafeEqual(row.password, password)){
          return cb(null,false,{message:'Incorrect username or password.'});
        }
        return cb(null,row);
      })
    }catch (err){
      cb(err);
    }
}));
passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
