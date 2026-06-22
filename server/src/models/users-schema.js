module.exports = (db) =>
	db.model(
		'Users',
		db.Schema({
			name: String,
			email: String,
			phoneNumber: String,
			passwordHash: String,
			role: {
				type: String,
				default: 'volunteer',
				enum: ['admin', 'volunteer'],
			},
		}, { timestamps: true })
);
