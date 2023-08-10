const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGODB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
app.use(bodyParser.json());
mongoose.connect(MONGODB);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
// TODO: сделать корс
app.use(cors());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
