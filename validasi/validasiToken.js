//import library dan module
const jsonwebtoken = require('jsonwebtoken');

//proses pengecekan token
module.exports = function(req, res, next) {
    //tampung data token
    const token = req.header('authtoken');

    //proses pengecekan token
    if (token) {
        try {
            const cektoken = jsonwebtoken.verify(token, process.env.JSONWEBTOKEN);

            if (cektoken) {
                req.pengguna = cektoken;
                next();
            } else {
                return res.status(400).send({
                    'status': false,
                    'pesan': 'Token Tidak Valid'
                });
            }
        } catch (error) {
            return res.status(400).send({
                'status': false,
                'pesan': 'Token Tidak Valid'
            });
        }
    } else {
        return res.status(400).send({
            'status': false,
            'pesan': 'Token Tidak Ditemukan'
        });
    }
}