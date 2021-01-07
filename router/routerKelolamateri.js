//import library dan module
const router = require('express').Router();
const validasiToken = require('../validasi/validasiToken');
const { validasiInputfile } = require('../validasi/validasiInputan');
const path = require('path');
const multer = require('multer');
const konfigurasipenyimpanan = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../') + '/public/filepengguna/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const uploadfile = multer({ storage: konfigurasipenyimpanan })

const modelMateri = require('../model/modelMateri');
const modelPengguna = require('../model/modelPengguna');

const filesystem = require('fs');

//implementasi router
router.post('/materi', validasiToken, uploadfile.any(), async (req, res) => {
    //tampung error inputan
    const { error } = validasiInputfile(req.body);

    //pengecekan error
    if (error) {
        return res.status(400).send({
            'status': false,
            'pesan': 'Pastikan Inputan Memenuhi Syarat'
        });
    } else {
        //tampung data materi
        const datamateri = new modelMateri({
            idpengguna: req.pengguna._id,
            namamateri: req.body.namamateri,
            kategorimateri: req.body.kategorimateri,
            namafilemateri: req.files[0].originalname
        });

        //proses menambahkan data materi
        try {
            const tambahmateri = await datamateri.save();
            if (tambahmateri) {
                uploadfile.single("filemateri");
                return res.status(200).send({
                    'status': true,
                    'pesan': 'Berhasil Menambahkan Data Materi'
                });
            } else {
                return res.status(400).send({
                    'status': false,
                    'pesan': 'Gagal Menambahkan Data Materi 1'
                });
            }
        } catch (error) {
            // return res.status(400).send({
            //     'status': false,
            //     'pesan': 'Gagal Menambahkan Data Materi 2'
            // });

            return res.send(error);
        }
    }
});

router.get('/materi', validasiToken, async (req, res) => {
    //tampung data pengguna
    const datapengguna = await modelPengguna.find({
        _id: req.pengguna._id,
        email: req.pengguna.email
    });

    //pengecekan pengguna
    if (datapengguna) {
        //tampung data materi
        const datamateri = await modelMateri.find({
            idpengguna: req.pengguna._id
        });

        return res.status(200).send({
            'status': true,
            'pesan': 'Berhasil Mendapatkan Materi',
            'materi': datamateri
        });
    } else {
        return res.status(400).send({
            'status': false,
            'pesan': 'Pengguna Tidak Terdaftar'
        });
    }

    const datamateri = await modelMateri.find({
        idpengguna: idpengguna
    });


});

router.get('/materi/:_id', validasiToken, async (req, res) => {
    //tampung data pengguna
    const datapengguna = await modelPengguna.find({
        _id: req.pengguna._id,
        email: req.pengguna.email
    });

    //pengecekan data pengguna
    if (datapengguna) {
        //tampung data materi
        const datamateri = await modelMateri.findOne({
            _id: req.params._id,
            idpengguna: req.pengguna._id
        });

        return res.status(200).send({
            'status': true,
            'pesan': 'Berhasil Mendapatkan Data Materi',
            'materi': datamateri
        });
    } else {
        return res.status(400).send({
            'status': false,
            'pesan': 'Pengguna Tidak Terdaftar'
        });
    }

});

router.delete('/materi/:_id', validasiToken, async (req, res) => {
    //tampung data pengguna
    const datapengguna = await modelPengguna.find({
        _id: req.pengguna._id,
        email: req.pengguna.email
    });

    //pengecekan data pengguna
    if (datapengguna) {
        //tampung data materi
        const datamateri = await modelMateri.findOne({
            _id: req.params._id,
            idpengguna: req.pengguna._id
        })

        //pengecekan data materi
        if (datamateri) {
            try {
                //proses penghapusan data materi
                const hapusmateri = await modelMateri.deleteOne({
                    _id: req.params._id,
                    idpengguna: req.pengguna._id
                });

                //pengecekan hapus data materi
                if (hapusmateri) {
                    filesystem.unlinkSync(process.env.LOKASIFILE + datamateri.namafilemateri);

                    return res.status(200).send({
                        'status': true,
                        'pesan': 'Berhasil Menghapus Data Materi'
                    });
                } else {
                    return res.status(400).send({
                        'status': false,
                        'pesan': 'Gagal Menghapus Data Materi'
                    });
                }
            } catch (error) {
                return res.status(400).send({
                    'status': false,
                    'pesan': 'Gagal Menghapus File Materi'
                });
            }
        } else {
            return res.status(400).send({
                'status': false,
                'pesan': 'Materi Tidak Ditemukan'
            });
        }
    } else {
        return res.status(400).send({
            'status': false,
            'pesan': 'Pengguna Tidak Terdaftar'
        });
    }
});


//export module
module.exports = router;
