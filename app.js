// Sarebbe server.js

"use strict";

// ----------------------- IMPORT -----------------------
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const moment = require('moment');

// ------------ AUTENTICAZIONE E SESSIONE ---------------
const passport = require('passport');
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy;
const utenteDao = require('./dao/utenteDao.js');
const cookieParser = require('cookie-parser');

// ----------------------- ROUTES -----------------------
const homeRouter = require('./routes/home');
const contattiRouter = require('./routes/contatti');
const regPersonaleRouter = require('./routes/regPersonale');
const regClienteRouter = require('./routes/regCliente');
const loginRouter = require('./routes/login');
const piattiRouter = require('./routes/piatti');
const aggPiattiRouter = require('./routes/aggPiatto');
const vediOrdiniRouter = require('./routes/vediOrdini');
const ordinaRouter = require('./routes/ordina');
const iMieiOrdiniRouter = require('./routes/iMieiOrdini');
const checkoutRouter = require('./routes/checkout.js');

// ----------------------- SETUP ------------------------

const app = express();
const port = 3003;

// Setup dell'engine della cartella "views"
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Variabili di default per la cartella "views"
app.use((_req, _res, next) => {
  app.locals.moment = moment;
  app.locals.title = '';   // Titolo della pagina of page
  app.locals.message = ''; // Messaggi utili
  app.locals.errors = [];  // Messaggi d'errore
  app.locals.active = '';  // "Sezione" attiva della navbar
  next();
});

// ----------------------- MIDDLEWARE ------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  // Solo per file statici (tutto ciò che c'è dentro public)

// ----------------------- AUTENTICAZIONE --------------

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {  // Modificare username => email
  utenteDao.findUtenteByEmailAndPassword(email, password).then(({ user, check }) => {
    if (!user) {
      return done(null, false, { message: "Email non valida." });
    }
    if (!check) {
      return done(null, false, { message: "Password non valida." });
    }

    return done(null, user);
  });
}
));

// ----------------------- UTENTE - SESSIONE -----------

passport.serializeUser(function (user, done) {
  done(null, user.email); // Non usare user.id/auto-increment
});

passport.deserializeUser(function (email, done) {
  utenteDao.findUtenteByEmail(email).then(user => {
    done(null, user);
  });
});

// SESSION
app.use(session({
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  secret: 'Segreto di sessione',           // process.env.SESSION_SECRET
  resave: false,
  saveUninitialized: false,
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

app.use('/', homeRouter);
app.use('/contatti', contattiRouter);
app.use('/regPersonale', regPersonaleRouter);
app.use('/regCliente', regClienteRouter);
app.use('/login', loginRouter);
app.use('/piatti', piattiRouter);
app.use('/aggPiatto', aggPiattiRouter);
app.use('/vediOrdini', vediOrdiniRouter);
app.use('/ordina', ordinaRouter);
app.use('/iMieiOrdini', iMieiOrdiniRouter);
app.use('/checkout', checkoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Attivo definitivamente il server --> Ora accetto richieste
app.listen(port, () => console.log(`Il server di RoadToSushi è attivo all'indirizzo http://localhost:${port}`));

module.exports = app;
