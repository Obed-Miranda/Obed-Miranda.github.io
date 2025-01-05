// functions/index.js
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');

exports.sendApplicationEmail = functions.https.onRequest(async (req, res) => {
  try {
    const { name, age, height, hobbies, describe, flowers, animal, wifePackage, wantKids, marryIn5Years, likeMmaMen, contact } = req.body;

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your preferred email service
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME,
      subject: 'New Girlfriend Application!',
      text: `
        Name: ${name}
        Age: ${age}
        Height: ${height}
        Hobbies: ${hobbies}
        Description: ${describe}
        Favorite Flower: ${flowers}
        Favorite Animal: ${animal}
        Wife Package: ${wifePackage}
        Want Kids: ${wantKids}
        Marry in 5 Years: ${marryIn5Years}
        Like MMA Men: ${likeMmaMen}
        Contact: ${contact}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email.');
  }
});
