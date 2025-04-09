const nodemailer = require('nodemailer');

// Loo transporter - siin kasutame Gmaili teenust, aga saad kasutada ka SendGridi vms teenuseid
const transporter = nodemailer.createTransport({
  service: 'gmail', // Võid muuta teenuse peale, kui kasutad teist teenust, nt Mailgun, SendGrid
  auth: {
    user: 'germo.eismann1@gmail.com', // Asenda oma e-posti aadressiga
    pass: 'ptfo ilkh horv ckui'   // Asenda oma e-posti parooliga
  }
});

// E-kirjade saatmise funktsioon
function sendBookingEmail(formData, callback) {
  // E-kiri kasutajale
  const mailOptionsForUser = {
    from: 'germo.eismann1@gmail.com', // E-posti aadress, millelt saadetakse
    to: formData.email,           // Kliendi e-posti aadress
    subject: 'Broneeringu kinnitus',
    text: `Tere ${formData.name},

Täname broneeringu eest! Siin on teie broneeringu detailid:

Alguskuupäev: ${formData.start_date}
Lõppkuupäev: ${formData.end_date}
Algusaeg: ${formData.start_time}
Lõppaeg: ${formData.end_time}
Transport: ${formData.transport ? 'Jah' : 'Ei'}
Lisainfo: ${formData.details}`
  };

  // E-kiri omanikule
  const mailOptionsForOwner = {
    from: 'germo.eismann1@gmail.com', // E-posti aadress, millelt saadetakse
    to: 'helinagethe@gmail.com', // Asenda omanikul oleva e-posti aadressiga
    subject: 'Uus broneering',
    text: `Uus broneering!

Kliendi detailid:
Nimi: ${formData.name}
E-mail: ${formData.email}
Alguskuupäev: ${formData.start_date}
Lõppkuupäev: ${formData.end_date}
Algusaeg: ${formData.start_time}
Lõppaeg: ${formData.end_time}
Transport: ${formData.transport ? 'Jah' : 'Ei'}
Lisainfo: ${formData.details}`
  };

  // Saada e-kiri kasutajale ja omanikule
  transporter.sendMail(mailOptionsForUser, (error, info) => {
    if (error) {
      console.log('Viga e-kirja saatmisel kasutajale:', error);
      callback('E-kirja saatmine kasutajale ebaõnnestus');
      return;
    }
    console.log('E-kiri kasutajale saadetud: ' + info.response);
  });

  transporter.sendMail(mailOptionsForOwner, (error, info) => {
    if (error) {
      console.log('Viga e-kirja saatmisel omanikule:', error);
      callback('E-kirja saatmine omanikule ebaõnnestus');
      return;
    }
    console.log('E-kiri omanikule saadetud: ' + info.response);
  });

  callback(null, 'E-kirjad saadetud edukalt');
}

module.exports = { sendBookingEmail };
