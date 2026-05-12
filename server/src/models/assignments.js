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
        serviceId: {
        type: db.Schema.Types.ObjectId,
        ref: 'Service',
      },
      status: {
        type: String,
        default: 'declined',
        enum: ['confirmed', 'pending', 'declined'],
      },
      assignedAt: Date
    })
  );
