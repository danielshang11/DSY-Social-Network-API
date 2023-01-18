const { model, Schema, Types } = require('mongoose');
const moment = require('moment');
const Reaction = require('./reaction');


// Creating Thought model's schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: String,
            default: moment().format('MMMM Do YYYY, h:mm:ss a')
        },
        username: {
            type: String,
            required: true
        },
        reactions:[
            Reaction
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);


thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;