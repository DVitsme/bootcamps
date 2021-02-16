const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors'); // console log color stuff
const app = express();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

PORT = process.env.PORT || 8000;
dotenv.config({ path: './config/config.env' });

// Conntect To DB
connectDB();

// Routes
const bootcamps = require('./routes/bootcamps');

// Dev Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/v1', bootcamps);

// error Handler middleware
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Server Running on port ${PORT}`.yellow.bold)
);

process.on(`unhandledRejection`, (err, process) => {
  console.log(`Error: ${err.message}`.red.underline.bold);
  // close server exit process
  server.close(() => process.exit());
});
