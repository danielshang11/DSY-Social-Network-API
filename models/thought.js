const { model, Schema, Types } = require('mongoose');
const moment = require('moment');

// Creating reaction sub document for thought schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: String,
            default: moment().format('MMMM Do YYYY, h:mm:ss a')
        }
    },
    {
        _id: false
    }
)

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
            reactionSchema
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