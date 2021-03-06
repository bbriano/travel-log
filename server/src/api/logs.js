const router = require('express').Router();
const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find({});
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res, next) => {
  try {
    if (req.get('X-API-KEY') !== process.env.API_KEY) {
      res.status(401);
      throw new Error('UnAuthorize');
    }

    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const status = await LogEntry.deleteOne({ _id: req.body });
    res.json(status);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
