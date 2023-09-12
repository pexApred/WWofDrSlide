const { Schema, model } = require('mongoose');

const AccessCodeSchema = new Schema({
    accesscode: {
        type: String,
        required: [true, "Access Code is required"],
        unique: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
});

const AccessCode = model('AccessCode', AccessCodeSchema);

module.exports = AccessCode;