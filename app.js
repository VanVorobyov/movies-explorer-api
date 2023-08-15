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

const { SERVER_PORT, DB } = require('./utils/config');

const app = express();
app.use(bodyParser.json());
mongoose.connect(DB);

app.use(requestLogger);
// app.use(limiter);
app.use(helmet());
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

app.listen(SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${SERVER_PORT}`);
});
