const router = require('express').Router();
const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find().then();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    console.log(logEntry);
    const createdEntry = await logEntry.save();
    console.log(createdEntry);
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;