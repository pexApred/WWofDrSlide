const { Schema, model } = require('mongoose');

const UserInteractionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
    },
    riddleId: {
        type: String,
        ref: 'Riddle',
        required: [true, "Riddle ID is required"],
    },
    isSolved: {
        type: Boolean,
        default: false,
        required: [true, "Solved is required"],
    },
    attempted: {
        type: Boolean,
        required: [true, "Attempts is required"],
    },
    usedHint: {
        type: Boolean,
        default: false,
        required: [true, "UsedHint is required"],
    },
    givenUp: {
        type: Boolean,
        required: [true, "GivenUp is required"],
    },
    incorrectAnswers: [{
        type: String,
        required: false,
    }],
    hintsUsed: [{
        type: Number,
        required: false,
    }],
    userFeedback: {
        difficultyRating: { type: Number },
        enjoymentRating: { type: Number },
    },
    userEngagement: {
        visits: { type: Number },
        riddlesAttempted: { type: Number },
        timeSpent: { type: Number },
    },
}, {
    timestamps: true
});

UserInteractionSchema.index({ userId: 1, riddleId: 1 }, { unique: true });

const UserInteraction = model('UserInteraction', UserInteractionSchema);

module.exports = UserInteraction;