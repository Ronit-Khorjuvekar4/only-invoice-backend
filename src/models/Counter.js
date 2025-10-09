const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', CounterSchema);

/**
 * @param {string} id 
 * @returns {Promise<number>} 
 */

async function getNextSequence(id) {
    const counter = await Counter.findByIdAndUpdate(
        id, { $inc: { seq: 1 } }, { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return counter.seq;
}

module.exports = { Counter, getNextSequence };