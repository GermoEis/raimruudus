const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); 

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve public folder
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint vormi jaoks
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Vorm saadetud:', formData);

  sendEmail(formData.email, formData.name, formData);
  res.status(200).json({ message: 'Vorm edukalt saadetud!' });
});

// Kõik muud GET-päringud suunatakse index.html failile (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Emaili saatmine
function sendEmail(userEmail, userName, formData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'germo.eismann1@gmail.com',
      pass: 'ptfo ilkh horv ckui'
    }
  });

  const mailOptions = {
    from: 'germoeismann1@gmail.com',
    to: userEmail,
    subject: 'Broneeringu kinnitus',
    text: `
      Tere ${userName},

      Täname broneeringu eest! Siin on teie andmed:

      Algus: ${formData.start_date} kell ${formData.start_time}
      Lõpp: ${formData.end_date} kell ${formData.end_time}
      Transport: ${formData.transport ? 'Jah' : 'Ei'}
      Lisainfo: ${formData.details}

      Parimate soovidega,
      Räim Ruudus
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('E-kirja saatmine ebaõnnestus:', error);
    } else {
      console.log('E-kiri saadetud:', info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server käivitatud: http://localhost:${port}`);
});
