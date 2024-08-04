const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const bcrypt = require('bcryptjs');
require('dotenv').config()
const User = require('./models/user')
const jwt = require('jsonwebtoken')

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL:"http://localhost:1000/api/v3/google/callback",
        scope: ["profile","email"],
    },
    async function(accessToken, refreshToken,profile,callback,done){
        console.log('Profile data')
        console.log(profile);
        
        try {
            // const { given_name, family_name, email } = profile._json;
          //   let user = await User.findOne({ email: email });
          //   const hashPass = await bcrypt.hash(profile.id,10);
          //   if (!user) {
          //     user = new User({
          //       first_name: given_name,
          //       last_name: family_name,
          //       email: email,
          //       password: hashPass,
          //     });
          //     await user.save();
          //   }
          //   else{
          //     const token = jwt.sign({ userId: user.googleId }, process.env.JWT_SECRET, { expiresIn: '2d' });
          //     user.token = token;
          //     localStorage.setItem('token',token);
          //   }
          //   // Generate JWT using googleId
          } catch (error) {
            console.log(error);
          }

          done(null,profile)
    })
)

passport.serializeUser((user, callback)=>{
    console.log("serializa ",user)
    callback(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})