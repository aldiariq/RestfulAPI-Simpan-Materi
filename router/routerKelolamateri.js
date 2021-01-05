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

//export module
module.exports = router;
