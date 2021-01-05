//import library dan module
const mongoose = require('mongoose');

//implementasi model
const modelPengguna = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tanggaldaftar: {
        type: Date,
        default: Date.now
    }
});

//export module
module.exports = mongoose.model('modelPengguna', modelPengguna);