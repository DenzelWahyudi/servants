module.exports = (db) =>
  db.model(
    'Services',
    db.Schema({
      name: String,
      date: Date,
      time: String,
      status: {
        type: String,
        default: 'Roles Open',
        enum: ['Roles Open', 'Fully Staffed'],
      },
    })
  );
