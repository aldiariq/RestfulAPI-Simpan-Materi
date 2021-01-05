//import library dan module
const mongoose = require('mongoose');

//implementasi model
const modelMateri = mongoose.Schema({
    idpengguna: {
        type: String,
        required: true
    },
    namamateri: {
        type: String,
        required: true
    },
    kategorimateri: {
        type: String,
        required: true
    },
    namafilemateri: {
        type: String,
        required: true
    },
    tanggaldibuat: {
        type: Date,
        default: Date.now
    }
});

//export module
module.exports = mongoose.model('modelMateri', modelMateri);