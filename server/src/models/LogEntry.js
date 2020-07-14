const { model, Schema } = require('mongoose');

module.exports = model(
  'LogEntry',
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      comments: String,
      imageURL: String,
      rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
      },
      latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
      },
      visitDate: {
        type: Date,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);
