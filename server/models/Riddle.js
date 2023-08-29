const { Schema, model } = require('mongoose');
const UserInteractionSchema = require('./UserInteraction')

const RiddleSchema = new Schema({
    _id: {
        type: Number,
        required: [true, "Riddle ID is required"],
    },
    riddleText: {
        type: String,
        required: [false],
    },
    riddleHint: {
        type: String,
        required: [true, "Riddle hints are required"],
    },
    riddleSolutions: [{
        type: String,
        required: [true, "Riddle solutions are required"],
    }],
    background_image: {
        type: String,
        required: [false],
    },
    riddleInteractions: [{
        type: Schema.Types.ObjectId,
        ref: 'UserInteraction',
    }],
});

const Riddle = model('Riddle', RiddleSchema);

module.exports = Riddle;