const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validateRequiredFields } = require('../../utils/validations')

exports.createAppointment = async(req, res) => {

    const appointment = req.body;
    const { date, profesionalId, centerId, rut, specialtyId } = appointment;
    
    try {
        
        const error = validateRequiredFields({date, profesionalId, centerId, rut, specialtyId})

        if (error) {
            return res.status(400).json({ error });
        }

        const numberAppointment = Math.floor(Date.now() / 1000);
        
        const appointment = await prisma.medicalAppointment.create({
            data: {
                status: "pending",
                numberAppointment,
                dateAndTime: new Date(date),
                medicalCenterId: centerId,
                doctorId: profesionalId,
                specialtyId: specialtyId,
                patientRut: rut
            },
            include: {
                patient: true
            }
        })

        res.status(201).json({ message: "Appointment created successfully", appointment });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
}


exports.getAppointmentByNumberAppointment = async(req, res) => {

    const { numberAppointment, rut } = req.body;

    try {

        const error = validateRequiredFields({numberAppointment, rut})

        if (error) {
            return res.status(400).json({ error });
        }

        const response = await prisma.medicalAppointment.findFirst({
            where: {
                numberAppointment,
                patientRut: rut
            },
            include: {
                specialty: true,
                medicalCenter: true,
                patient: {
                    include: {
                        prevision: true
                    }
                },
                doctor: {
                    select: {
                        name: true,
                        lastName: true
                    }
                }
                
            }
        })

        const appointmentDate = new Date(response.dateAndTime);
        const today = new Date();

        if ( appointmentDate < today ) {
            return res.status(404).json({ error: "expired medical appointment" });
        }

        res.status(200).json(response)
    } catch (error) {
        console.log("Error to get appointment:", error)
        res.status(500).json({ error: "Internal server error" });
    }
}


exports.changeStatusAppointment = async(req, res) => {

    const { numberAppointment, rut, status } = req.body;

    try {

        const error = validateRequiredFields({numberAppointment, rut, status})
        if (error) {
            return res.status(400).json({ error });
        }
        
        const response = await prisma.medicalAppointment.update({
            where: {numberAppointment},
            data:{
                status: status
            } 
        })

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.getAppointmentByUserId = async(req, res) => {

    const { id } = req.query;
    const parsedId = parseInt(id)

    try {

        if ( !id ) {
            return res.status(400).json({error: "id field are required"})
        }

        const response = await prisma.medicalAppointment.findMany({
            where: {
                doctorId: parsedId
            },
            include: {
                medicalCenter: true,
                specialty: true,
                patient: true
            }
        })

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }

}