const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
   
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: String,
        default: 0
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Transaction', transactionSchema);