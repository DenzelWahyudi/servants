module.exports = (db) =>
    db.model(
        'Users',
        db.Schema(
            {
                name: String,
                email: String,
                phoneNumber: String,
                passwordHash: String,
                pushToken: {
                    type: String,
                    default: null,
                },
                role: {
                    type: String,
                    default: 'volunteer',
                    enum: ['admin', 'volunteer'],
                },
            },
            { timestamps: true }
        )
    );
