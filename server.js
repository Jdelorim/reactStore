const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');
//const seed = require('./config/seed');
// const config = require('./config/config.js');
const PORT = process.env.PORT || 4000;
const app = express();
let config;
require('./auth/passport')(passport);
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  config = require('./config/config');
}
// passport
app.use(session({
  secret: (process.env.NODE_ENV === 'production') ? process.env.SECRECT : config.secrect,
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  //4 hours
  cookie: { maxAge: 240 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reactStore', { useNewUrlParser: true , useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

require('./routes/customers.js')(app);



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
