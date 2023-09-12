const { Schema, model } = require('mongoose');

const RiddleSchema = new Schema({
    id: {
        type: Number,
        required: [true, "Riddle ID is required"],
    },
    riddle: {
        type: String,
        required: [false],
    },
    hint: {
        type: String,
        required: [true, "Riddle hints are required"],
    },
    solutions: [{
        type: String,
        required: [true, "Riddle solutions are required"],
    }],
    background_image: {
        type: String,
        required: [false],
    }
});

const Riddle = model('Riddle', RiddleSchema);

module.exports = Riddle;