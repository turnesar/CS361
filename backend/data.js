const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//basic data structure that can be modified in Node.js

const deetsSchema = new Schema(
	{
		id: Number,
		message: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Data", deetsSchema);
