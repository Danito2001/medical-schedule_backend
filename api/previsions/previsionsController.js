const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


exports.getAllPrevisions = async(req, res) => {

    try {
        const response = await prisma.prevision.findMany()
        res.status(200).json(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Internal server error"
        });
    }

}