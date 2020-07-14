const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
// const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const middlewares = require('./middlewares');
const logs = require('./api/logs');

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(morgan('common'));
app.use(helmet());
// app.use(cors());
// app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1106;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
