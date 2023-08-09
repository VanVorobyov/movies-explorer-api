const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const helmet = require('helmet');
const cors = require('cors');

const { PORT = 3000, MONGODB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

mongoose.connect(MONGODB);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
