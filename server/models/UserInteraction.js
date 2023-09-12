const { Schema, model } = require('mongoose');
const { User } = require('./User');
const { Riddle } = require('./Riddle');

const UserInteractionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
    },
    riddle_id: {
        type: Schema.Types.ObjectId,
        ref: 'Riddle',
        required: [true, "Riddle ID is required"],
    },
    solved: {
        type: Boolean,
        required: [true, "Solved is required"],
    },
    attempts: {
        type: Number,
        required: [true, "Attempts is required"],
    },
    usedHint: {
        type: Boolean,
        required: [true, "UsedHint is required"],
    },
    timestamp: {
        type: Date,
        required: [true, "Timestamp is required"],
    },
    startTime: {
        type: Date,
        required: [true, "Start time is required"],
    },
    solveTime: {
        type: Date,
        required: false,
    },
    incorrectAnswers: [{
        type: String,
        required: false,
    }],
    hintsUsed: [{
        type: Number,
        required: false,
    }],
    hintUsageTime: {
        type: Date,
        required: false,
    },
    userFeedback: {
        difficultyRating: { type: Number },
        enjoymentRating: { type: Number },
    },
    userEngagement: {
        visits: { type: Number },
        riddlesAttempted: { type: Number },
        timeSpent: { type: Number },  // In seconds or minutes, depending on what's appropriate for your application.
    },
});

const UserInteraction = model('UserInteraction', UserInteractionSchema);

module.exports = UserInteraction;