const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validateRequiredFields } = require('../../utils/validations')


exports.validationRut = async(req, res) => {

    const { rut, previsionId } = req.body;

    const error = validateRequiredFields({rut, previsionId})

    if (error) {
        return res.status(400).json({ error });
    }
        
    if (typeof rut !== 'string') {
        return res.status(400).json({ error: "rut must be a string" });
    }
    
    try {
        const patient = await prisma.patient.findUnique({
            where: {
                rut,
                previsionId
            }
        })

        if (!patient) {
            return res.status(404).json({ error: 'Ruth does not exist in the database' });
        }

        res.status(200).json(patient)
    } catch (error) {
        console.error('Error en la validación del RUT:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}