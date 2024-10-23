const { sendEmail } = require('../../utils/mailer');
const { validateRequiredFields } = require('../../utils/validations')


exports.sendEmail = async(req, res) => {

    const { to, subject, text } = req.body;
  
    try {

        const error = validateRequiredFields({to, subject, text})

        if (error) {
            return res.status(400).json({ error });
        }
        
      	await sendEmail(to, subject, text);
      	res.status(200).send('Correo enviado correctamente');
    } catch (error) {
      	res.status(500).send('Error al enviar correo');
    }

}