const QRCode = require('qrcode');

async function makeQR(value) {

    return await QRCode.toDataURL(value);
}

module.exports =  makeQR ;