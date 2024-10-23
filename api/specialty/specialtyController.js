const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllSpecialty = async (_, res) => {
    try {
        const response = await prisma.specialty.findMany();

        res.status(200).json(response);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
