module.exports = (db) =>
  db.model(
    'Assignments',
    db.Schema({
      userId: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
      },
      roleId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Role',
      },
      status: {
        type: String,
        default: 'pending',
        enum: ['confirmed', 'pending', 'declined'],
      },
    })
  );
