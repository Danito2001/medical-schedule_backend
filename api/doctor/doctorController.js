const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { validateRequiredFields, validateDays, validDays } = require('../../utils/validations')

exports.getFilteredDoctors = async(req, res) => {

    const { centerId, specialtyId, day } = req.query;

    const centerIdParsed = parseInt(centerId);
    const specialtyIdParsed = parseInt(specialtyId);

    try {
        let doctors = [];

        const error = validateRequiredFields({centerIdParsed, specialtyIdParsed, day})

        if (error) {
            return res.status(400).json({ error });
        }
        
        if ( !validDays.includes(day.toLocaleLowerCase()) ) {
            return res.status(400).json({ error: `${day} It's not a valid day`});
        }


        if (specialtyIdParsed && centerIdParsed && day) {
            doctors = await prisma.doctor.findMany({
                where: {
                    specialtyId: specialtyIdParsed,
                    centerId: centerIdParsed,
                    DoctorAvailability: {
                        days: {
                            has: day 
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    lastName: true,
                    center: true,
                    specialty: true,
                    centerId: true,
                    specialtyId: true,
                    DoctorAvailability: {
                        select: {
                            id: true,
                            startDateTime: true,
                            endDateTime: true,
                            isAvailable: true,
                            doctorId: true,
                            patientId: true,
                            days: true
                        }
                    }
                }
            })
        } 

        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error retrieving filtered doctors"
        });
    }
};

exports.setAvailabilityByDoctorId = async(req, res) => {

    const { startTime, endTime, days, doctorId } = req.body;

    try { 

        const error = validateRequiredFields({startTime, endTime, days, doctorId})

        if (error) {
            return res.status(400).json({ error });
        }

        if (days.length < 4 ) {
            return res.status(400).json({error: "Must have at least 4 days"})
        }

        const invalidDays = validateDays(days)

        if (invalidDays) {
            return res.status(400).json({invalidDays})
        }
        
        const existAvailability = await prisma.doctorAvailability.findUnique({
            where: {doctorId: doctorId}
        })

        let response;

        if (existAvailability) {
            response = await prisma.doctorAvailability.update({
                where: {doctorId: doctorId},
                data: {
                    startDateTime: startTime,
                    endDateTime: endTime,
                    days: days
                }
            })

        } else {

            response = await prisma.doctorAvailability.create({
                data: {
                    startDateTime: startTime,
                    endDateTime: endTime,
                    days: days,
                    doctorId: doctorId
                }
            })

        }
        
        res.status(201).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

exports.getDoctorAvailabilityById = async(req, res) => {

    const { id } = req.query;

    const parsedId = parseInt(id)

    try {

        if ( !id ) {
            return res.status(400).json({error: "id field are required"})
        }
        
        const response = await prisma.doctorAvailability.findMany({
            where: {
                doctorId: parsedId
            },
            select: {
                startDateTime: true,
                endDateTime: true,
                days: true, 
            }
        })

        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }

}

exports.getPatientByDoctorId = async(req, res) => {

    const { id } = req.query;

    const parsedId = parseInt(id)
    const today = new Date();

    try {

        if ( !id ) {
            return res.status(400).json({error: "id field are required"})
        }

        await prisma.medicalAppointment.updateMany({
            where: {
                dateAndTime: {
                    lt: today
                },
                status: {
                    not: 'disabled'
                }
            },
            data: {
                status: 'disabled'
            }
        })
        
       const updatedResponse = await prisma.doctor.findUnique({
            where: {
                id: parsedId,
            },
            select: {
                appointment: {
                    include: {
                        patient: true,
                    },
                },
            },
        });

        res.status(200).json(updatedResponse);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }

}
