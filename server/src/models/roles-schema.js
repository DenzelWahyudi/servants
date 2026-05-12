module.exports = (db) =>
  db.model(
    'Roles',
    db.Schema({
        serviceId: {
            type: db.Schema.Types.ObjectId,
            ref: 'Service',
        },
        name: String,
        spotsTotal: Number,
        spotsFilled: Number
        })
    );
