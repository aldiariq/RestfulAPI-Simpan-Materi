//import library dan module
const router = require('express').Router();
const {validasiDaftar, validasiMasuk} = require('../validasi/validasiInputan');
const modelPengguna = require('../model/modelPengguna');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

//implementasi router
router.post('/daftar', async (req, res) => {
    //tampung error inputan
    const {error} = validasiDaftar(req.body);

    //pengecekan error
    if (error) {
        return res.status(400).send({
            'status': 400,
            'pesan': 'Pastikan Inputan Memnuhi Syarat'
        });
    } else {
        //tampung cek email
        const cekemail = await modelPengguna.findOne({
            email: req.body.email
        });

        //pengecekan email
        if (cekemail) {
            return res.status(400).send({
                'status': false,
                'pesan': 'Pastikan Email Belum Terdaftar'
            });
        } else {
            //proses enkripsi password
            const salt = await bcryptjs.genSalt(10);
            const passwordenkripsi = await bcryptjs.hash(req.body.password, salt);

            //tampung data daftar
            const datadaftar = new modelPengguna({
                email: req.body.email,
                nama: req.body.nama,
                password: passwordenkripsi
            });

            //proses daftar pengguna
            try {
                //tampung daftar pengguna
                const daftarpengguna = await datadaftar.save();

                //pengecekan pendaftaran
                if (daftarpengguna) {
                    return res.status(200).send({
                        'status': true,
                        'pesan': 'Berhasil Mendaftarkan Pengguna'
                    });
                } else {
                    return res.status(400).send({
                        'status': false,
                        'pesan': 'Gagal Mendaftarkan Pengguna'
                    });
                }
            } catch (error) {
                return res.status(400).send({
                    'status': false,
                    'pesan': 'Gagal Mendaftarkan Pengguna'
                });
            }

            
            
        }
    }
});

router.post('/masuk', async (req, res) => {
    //tampung error inputan
    const {error} = validasiMasuk(req.body);

    //pengecekan error
    if (error) {
        return res.status(400).send({
            'status': false,
            'pesan': 'Pastikan Inputan Memenuhi Syarat'
        });
    } else {
        //tampung cek email
        const cekemail = await modelPengguna.findOne({
            email: req.body.email
        });

        //pengecekan email
        if (cekemail) {
            //tampung cek password
            const cekpassword = await bcryptjs.compare(req.body.password, cekemail.password);

            if (cekpassword) {
                //tampung data token
                const token = jsonwebtoken.sign({
                    _id: cekemail._id
                }, process.env.JSONWEBTOKEN);

                //tampung data pengguna
                const datapengguna = ({
                    email: cekemail.email,
                    nama: cekemail.nama,
                    tanggaldaftar: cekemail.tanggaldaftar
                });

                return res.status(200).send({
                    'status': true,
                    'pesan': 'Berhasil Masuk',
                    'token': token,
                    'pengguna': datapengguna
                });
            } else {
                return res.status(400).send({
                    'status': false,
                    'pesan': 'Pastikan Password Benar'
                });
            }
        } else {
            return res.status(400).send({
                'status': false,
                'pesan': 'Pastikan Email Sudah Terdaftar'
            });
        }

    }
});

//export module
module.exports = router;