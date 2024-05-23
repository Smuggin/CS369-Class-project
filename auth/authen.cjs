const router =require("express").Router();
const bodyParser = require("body-parser")
const passport = require("passport")
const CLIENT_URL = "http://localhost:5173/"
router.get("/login/success",(req,res)=>{
    if(req.user){
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
router.post('/password',function(req, res){
    console.log("pass"+ req.body);
}
)
router.post("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

router.get("/google/callback", passport.authenticate("google",{
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}));
router.get("/login/failed",(req,res)=>{
    res.redirect(CLIENT_URL);
})

module.exports = router