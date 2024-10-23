const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'daniel.carvajalnavarro92@gmail.com', 
                pass: 'cmzhfykzrcaeptzm'
            }
        });

        const mailOptions = {
            from: 'tu-email@gmail.com',
            to: to,   
            subject: subject,
            text: text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
        
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw new Error('No se pudo enviar el correo');
    }
};

module.exports = { sendEmail };
