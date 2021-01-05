//import library dan module
const Joi = require('@hapi/joi');

//implementasi validasi inputan
const validasiDaftar = (data) => {
    const schemaDaftar = Joi.object({
        email: Joi.string().required().email(),
        nama: Joi.string().required(),
        password: Joi.string().required()
    });

    return schemaDaftar.validate(data);
}

const validasiMasuk = (data) => {
    const schemaMasuk = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return schemaMasuk.validate(data);
}

//export module
module.exports.validasiDaftar = validasiDaftar;
module.exports.validasiMasuk = validasiMasuk;