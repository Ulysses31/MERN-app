const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const moviesRoute = require('./routes/movies');

// config
dotenv.config();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '5000';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// mongoose
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: 1,
  connectTimeoutMS: 30000,
  dbName: process.env.DB_NAME,
});

// db events
mongoose.connection.on('connected', () => {
  console.log(`Connected to database.`);
  // logger.info(`Connected to database.`);

  app.listen(PORT, HOST, () => {
    console.log(
      `Server started at http://${HOST}:${PORT}...`
    );
  });
});

mongoose.connection.on('reconnected', () => {
  console.log(`Reconnected to database.`);
  // logger.info(`Reconnected to database.`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error: ${err.message}.`);
  // mailer(`Database connection error: ${err.message}`);
  // logger.error(`Database connection error: ${err.message}`);
});

// log every request - response
app.use((req, res, next) => {
  // request
  console.log(
    JSON.stringify({
      headers: req.headers,
      remote: req._remoteAddress,
      url: req.url,
      method: req.method,
      body: req.body,
    })
  );
  // logger.info(
  // 	JSON.stringify({
  // 		headers: req.headers,
  // 		remote: req._remoteAddress,
  // 		url: req.url,
  // 		method: req.method,
  // 		body: req.body
  // 	})
  // );
  // response
  res.on('finish', () => {
    console.log(
      JSON.stringify({
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res._header,
        body: res.send,
      })
    );
    // logger.info(
    // 	JSON.stringify({
    // 		statusCode: res.statusCode,
    // 		statusMessage: res.statusMessage,
    // 		headers: res._header,
    // 		body: res.send
    // 	})
    // );
  });
  next();
});

// API routes
app.use('/movies', moviesRoute);

// production script needed
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    );
  });
}
