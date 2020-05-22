const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const loanSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    address: {
        city: String,
        state: String,
    },
    amount: {
        type: Number
    },
    loanTenure: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    loanStatus: {
        type: String,
        default: "created"
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Loan', loanSchema);