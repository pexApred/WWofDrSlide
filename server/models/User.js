const { Schema, model } = require('mongoose');
const UserInteraction = require('./UserInteraction');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    accesscode: {
        type: Schema.Types.ObjectId,
        ref: 'AccessCode',
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    userAnalytics: [{
        type: Schema.Types.ObjectId,
        ref: 'UserInteraction',
    }],
},
    {
        toJSON: {
            virtuals: true,
        },
    }
);

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
//   Turn this Virtual into one for analytics of the user
//   UserSchema.virtual('analytics').get(function () {
//     return this.userAnalytics.length;
//   });

const User = model('User', UserSchema);

module.exports = User;