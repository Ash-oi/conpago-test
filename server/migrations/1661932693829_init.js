/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable("users", {
		id: "id", // would normally recommend UUID
		email: { type: "varchar(254)", notNull: true, unique: true },
		username: { type: "varchar(254)", notNull: true, unique: true },
		password: { type: "varchar(254)", notNull: true },
		country: { type: "varchar(254)", notNull: true },
		createdAt: {
			type: "timestamp",
			notNull: true,
			default: pgm.func("current_timestamp"),
		},
	});
};

exports.down = (pgm) => {};
