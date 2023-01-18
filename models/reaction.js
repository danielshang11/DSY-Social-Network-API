const { model, Schema, Types } = require('mongoose');
const moment = require('moment');

// Creating reaction sub document for thought schema
const Reaction = new Schema(
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

module.exports = Reaction;