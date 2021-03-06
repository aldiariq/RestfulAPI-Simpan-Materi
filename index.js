//import library dan module
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routerAutentikasi = require('./router/routerAutentikasi');
const routerKelolamateri = require('./router/routerKelolamateri');

//implementasi dotenv
dotenv.config();

//koneksi basis data
mongoose.connect(
    process.env.MONGODB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Koneksi Basis Data Berhasil');
    }
);

//implementasi router
const baseurl = '/api';
app.get(baseurl, (req, res) => {
    return res.status(200).send({
        'status': true,
        'pesan': 'Endpoint Utama RestfulAPI'
    });
});

app.use(baseurl + '/autentikasi', routerAutentikasi);

app.use(baseurl + '/kelolamateri', routerKelolamateri);

//menjalankan server
const port = 3000;
app.listen(port, () => {
    console.log(`Berhasil Menjalankan Server pada Port ${port}`);
});