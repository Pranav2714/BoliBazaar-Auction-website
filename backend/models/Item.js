const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuctionItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startingBid: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            default: "INR"
        }
    },
    currentBid: {
        amount: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            required: false,
            default: "INR"
        }
    },
    endTime: {
        type: Date,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    images: [{
        type: Buffer,
        required: true
    }],
    location: {
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    finalBuyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    currentBuyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dealClosed: {
        type: Boolean,
        default: false
    }
});

const AuctionItem = mongoose.model('AuctionItem', AuctionItemSchema);
module.exports = AuctionItem;
