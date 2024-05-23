
const cookieSession = require("cookie-session");
const express = require("express");
const app = express()
const passport = require("passport")
const passportSetup = require("./passport.cjs")
const cors = require("cors");
const authRoute = require("./authen.cjs")

app.use(cookieSession(
    {
        name:"session",keys:["test"],maxAge: 24 * 60 * 60 *100
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE","OPTIONS"],
    credentials:true
}));
app.use("/auth", authRoute);


app.listen("5000",()=>(
    console.log("Server is running")
));