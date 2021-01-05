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

const validasiInputfile = (data) => {
    const schemaInputfile = Joi.object({
        namamateri: Joi.string().required(),
        kategorimateri: Joi.string().required()
    });

    return schemaInputfile.validate(data);
}

//export module
module.exports.validasiDaftar = validasiDaftar;
module.exports.validasiMasuk = validasiMasuk;
module.exports.validasiInputfile = validasiInputfile;